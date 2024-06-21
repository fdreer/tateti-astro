import { WINNER_COMBINATIONS, type Board } from '@/consts'

export const checkWinner = (board: Board): boolean => {
	return WINNER_COMBINATIONS.some((combination) => {
		const [a, b, c] = combination
		return board[a] && board[a] === board[b] && board[a] === board[c]
	})
}
