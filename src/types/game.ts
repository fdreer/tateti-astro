import type { Board, TurnValue, Winner } from '@/consts'

export interface Player {
	id: string
	name: string
	symbol: 'X' | 'O'
	isReady: boolean
}

export interface GameRoom {
	id: string
	board: Board
	currentTurn: TurnValue
	winner: Winner
	players: {
		[playerId: string]: Player
	}
	gameStatus: 'waiting' | 'playing' | 'finished'
	createdAt: number
	lastMove?: {
		playerId: string
		position: number
		timestamp: number
	}
}

export interface GameMove {
	position: number
	playerId: string
	symbol: 'X' | 'O'
	timestamp: number
}
