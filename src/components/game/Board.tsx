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
	return (
		<>
			{!winner ? (
				<h2 style={{ margin: 0 }}>TURNO DE {turn}</h2>
			) : (
				<h2 style={{ margin: 0 }}>GANÓ "{winner}"</h2>
			)}
			<section className="board">
				{board.map((square, index) => (
					<Square key={index} index={index} onPlay={onPlay}>
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
