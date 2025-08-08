import { useEffect, useState } from 'preact/hooks'
import { getPlayerId } from '@/lib/playerId'
import {
	createRoom,
	joinRoom,
	onRoomChange,
	makeMove,
	leaveRoom
} from '@/lib/firebaseService'
import type { GameRoom } from '@/types/game'

export default function OnlineGame() {
	const [userId] = useState(() => getPlayerId())
	const [roomId, setRoomId] = useState<string>('')
	const [room, setRoom] = useState<GameRoom | null>(null)
	const [playerName, setPlayerName] = useState('Player')

	// Al montar, extraemos el hash
	useEffect(() => {
		const hash = window.location.hash
		if (hash.startsWith('#')) setRoomId(hash.slice(1))
	}, [])

	// Escuchar cambios cuando tengamos roomId
	useEffect(() => {
		if (!roomId) return
		onRoomChange(roomId, setRoom)
		return () => {
			leaveRoom(roomId, userId)
		}
	}, [roomId, userId])

	const handleCreateRoom = async () => {
		const id = await createRoom()
		// redirige al hash y dispara el efecto de arriba
		window.location.hash = `#${id}`
	}

	const handleJoinRoom = async () => {
		if (!roomId) {
			const ask = prompt('Id de sala')
			if (!ask) return
			setRoomId(ask)
		}
		const ok = await joinRoom(roomId, userId, playerName)
		if (!ok) alert('No se pudo unir: sala llena o no existe')
	}

	const handleCellClick = (pos: number) => {
		if (!roomId) return
		makeMove(roomId, userId, pos)
	}

	return (
		<div>
			<div>
				<button onClick={handleCreateRoom}>Crear sala</button>
				<input
					value={playerName}
					onChange={(e) => setPlayerName(e.currentTarget.value)}
				/>
				<button onClick={handleJoinRoom}>Unirse</button>
			</div>

			{room && (
				<>
					<div>Estado: {room.gameStatus}</div>
					<div>Turno: {room.currentTurn}</div>
					<div
						style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)' }}
					>
						{room.board.map((cell, i) => (
							<button
								key={i}
								onClick={() => handleCellClick(i)}
								style={{ width: 60, height: 60 }}
							>
								{cell}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	)
}
