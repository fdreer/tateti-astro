import {
	Turn,
	type Board as BoardType,
	type TurnValue,
	type Winner
} from '@/consts'
import Button from '../buttons/Button'
import Square from '@/components/game/Square'
import Close from '@/components/icons/Close'
import Circle from '@/components/icons/Circle'
import Reload from '@/components/icons/Reload'

interface Props {
	board: BoardType
	onPlay: (index: number) => void
	resetBoard: () => void
	turn: TurnValue
	winner: Winner
}

const Board = ({ board, onPlay, resetBoard, turn, winner }: Props) => {
	const isTie = board.every((square) => square !== null) && !winner

	const getStatusMessage = () => {
		if (winner) return `¡GANÓ "${winner}"!`
		if (isTie) return '¡EMPATE!'
		return `TURNO DE "${turn}"`
	}

	return (
		<>
			<h2 style={{ margin: 0, marginBottom: '10px' }}>{getStatusMessage()}</h2>

			<section className="board">
				{board.map((square, index) => (
					<Square
						key={index}
						index={index}
						onPlay={onPlay}
						disabled={!!square || !!winner || isTie}
					>
						{square === Turn.X ? (
							<Close />
						) : square === Turn.O ? (
							<Circle />
						) : null}
					</Square>
				))}
			</section>

			<Button onClick={resetBoard}>
				<Reload />
			</Button>
		</>
	)
}

export default Board
