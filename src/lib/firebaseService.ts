// src/lib/firebaseService.ts
import {
	ref,
	push,
	set,
	get,
	onValue,
	off,
	remove,
	update
} from 'firebase/database'
import { database as db } from './firebase' // asegúrate de la ruta
import { INITIAL_BOARD } from '@/consts'
import type { GameRoom, Player } from '@/types/game'

// createRoom, joinRoom, makeMove, resetGame, onRoomChange, offRoomChange, leaveRoom
export async function createRoom(): Promise<string> {
	const roomsRef = ref(db, 'rooms')
	const newRoomRef = push(roomsRef)
	const roomId = newRoomRef.key!

	const gameRoom: GameRoom = {
		id: roomId,
		board: [...INITIAL_BOARD],
		currentTurn: 'X',
		winner: null,
		players: {},
		gameStatus: 'waiting',
		createdAt: Date.now()
	}

	await set(newRoomRef, gameRoom)
	return roomId
}

export async function joinRoom(
	roomId: string,
	playerId: string,
	playerName: string
): Promise<boolean> {
	const roomRef = ref(db, `rooms/${roomId}`)
	const snapshot = await get(roomRef)
	if (!snapshot.exists()) return false

	const room = snapshot.val() as GameRoom
	const playersCount = Object.keys(room.players || {}).length
	if (playersCount >= 2) return false

	const symbol = playersCount === 0 ? 'X' : 'O'
	const player: Player = {
		id: playerId,
		name: playerName,
		symbol,
		isReady: true
	}

	const updates: any = {}
	updates[`rooms/${roomId}/players/${playerId}`] = player
	if (playersCount === 1) updates[`rooms/${roomId}/gameStatus`] = 'playing'

	await update(ref(db), updates)
	return true
}

export async function makeMove(
	roomId: string,
	playerId: string,
	position: number
): Promise<boolean> {
	const roomRef = ref(db, `rooms/${roomId}`)
	const snapshot = await get(roomRef)
	if (!snapshot.exists()) return false

	const room = snapshot.val() as GameRoom
	const player = room.players[playerId]
	if (
		!player ||
		room.currentTurn !== player.symbol ||
		room.board[position] !== null
	)
		return false

	const newBoard = [...room.board]
	newBoard[position] = player.symbol
	const winner = checkWinner(newBoard)
	const isTie = newBoard.every((cell) => cell !== null) && !winner

	const updates: any = {}
	updates[`rooms/${roomId}/board`] = newBoard
	updates[`rooms/${roomId}/lastMove`] = {
		playerId,
		position,
		timestamp: Date.now()
	}

	if (winner) {
		updates[`rooms/${roomId}/winner`] = winner
		updates[`rooms/${roomId}/gameStatus`] = 'finished'
	} else if (isTie) {
		updates[`rooms/${roomId}/gameStatus`] = 'finished'
	} else {
		updates[`rooms/${roomId}/currentTurn`] = player.symbol === 'X' ? 'O' : 'X'
	}

	await update(ref(db), updates)
	return true
}

export async function resetGame(roomId: string): Promise<void> {
	const updates: any = {}
	updates[`rooms/${roomId}/board`] = [...INITIAL_BOARD]
	updates[`rooms/${roomId}/currentTurn`] = 'X'
	updates[`rooms/${roomId}/winner`] = null
	updates[`rooms/${roomId}/gameStatus`] = 'playing'
	updates[`rooms/${roomId}/lastMove`] = null
	await update(ref(db), updates)
}

export function onRoomChange(
	roomId: string,
	callback: (room: GameRoom | null) => void
) {
	const roomRef = ref(db, `rooms/${roomId}`)
	onValue(roomRef, (snapshot) => {
		if (snapshot.exists()) callback(snapshot.val() as GameRoom)
		else callback(null)
	})
}

export function offRoomChange(roomId: string) {
	const roomRef = ref(db, `rooms/${roomId}`)
	off(roomRef)
}

export async function leaveRoom(
	roomId: string,
	playerId: string
): Promise<void> {
	const playerRef = ref(db, `rooms/${roomId}/players/${playerId}`)
	await remove(playerRef)

	const roomRef = ref(db, `rooms/${roomId}`)
	const snapshot = await get(roomRef)
	if (snapshot.exists()) {
		const room = snapshot.val() as GameRoom
		const playersCount = Object.keys(room.players || {}).length
		if (playersCount === 0) await remove(roomRef)
	}
}

function checkWinner(board: any[]): 'X' | 'O' | null {
	const winPatterns = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]
	for (const [a, b, c] of winPatterns) {
		if (board[a] && board[a] === board[b] && board[a] === board[c])
			return board[a]
	}
	return null
}
