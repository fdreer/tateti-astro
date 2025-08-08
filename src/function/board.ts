import { WINNER_COMBINATIONS, type Board, type Winner } from '@/consts'

export const checkWinner = (board: Board): boolean => {
	return WINNER_COMBINATIONS.some((combination) => {
		const [a, b, c] = combination
		return board[a] && board[a] === board[b] && board[a] === board[c]
	})
}

export const getWinner = (board: Board): Winner => {
	for (const combination of WINNER_COMBINATIONS) {
		const [a, b, c] = combination
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a]
		}
	}
	return null
}
