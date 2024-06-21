export const Turn = {
	X: 'X',
	O: 'O',
	NONE: null
} as const

export type TurnValue = (typeof Turn)[keyof typeof Turn]

export const INITIAL_BOARD = [
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null
] as Board

export type Board = [
	TurnValue,
	TurnValue,
	TurnValue,
	TurnValue,
	TurnValue,
	TurnValue,
	TurnValue,
	TurnValue,
	TurnValue
]

export const WINNER_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

export type Winner = TurnValue

// export type StartGame = {
//     isMyTurn: boolean
//     symbol: 'X' | 'O'
// }
