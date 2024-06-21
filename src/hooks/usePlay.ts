import {
	INITIAL_BOARD,
	Turn,
	type Board,
	type TurnValue,
	type Winner
} from '@/consts'
import { checkWinner } from '@/function/board'
import { useState } from 'preact/hooks'

export const usePlay = () => {
	const [board, setBoard] = useState<Board>(INITIAL_BOARD)
	const [turn, setTurn] = useState<TurnValue>(Turn.X)
	const [winner, setWinner] = useState<Winner>(null)

	const play = (index: number) => {
		if (board[index] || winner) return

		const newBoard: Board = [...board]
		newBoard[index] = turn
		const newTurn = turn === Turn.X ? Turn.O : Turn.X
		setBoard(newBoard)
		setTurn(newTurn)

		const isWinner = checkWinner(newBoard)
		if (isWinner) {
			setWinner(turn)
			// confetti()
			return
		}
	}

	const resetBoard = () => {
		setBoard(INITIAL_BOARD)
		setTurn(Turn.X)
		setWinner(null)
	}

	return { board, turn, winner, play, resetBoard }
}

export default usePlay
