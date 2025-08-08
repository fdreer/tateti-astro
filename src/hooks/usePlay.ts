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

		const newBoard: Board = [...board] as Board
		newBoard[index] = turn

		setBoard(newBoard)

		const isWinner = checkWinner(newBoard)
		if (isWinner) {
			setWinner(turn)
			return
		}

		// Verificar empate
		const isTie = newBoard.every((square) => square !== null)
		if (isTie) {
			setWinner(null) // O podrías crear un estado especial para empate
			return
		}

		// Cambiar turno solo si no hay ganador ni empate
		const newTurn = turn === Turn.X ? Turn.O : Turn.X
		setTurn(newTurn)
	}

	const resetBoard = () => {
		setBoard([...INITIAL_BOARD] as Board)
		setTurn(Turn.X)
		setWinner(null)
	}

	return { board, turn, winner, play, resetBoard }
}

export default usePlay
