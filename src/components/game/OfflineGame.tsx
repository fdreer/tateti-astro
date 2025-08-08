import usePlay from '@/hooks/usePlay'
import Board from '@/components/game/Board'

const OfflineGame = () => {
	const { board, play, turn, winner, resetBoard } = usePlay()

	return (
		<Board
			board={board}
			onPlay={play}
			turn={turn}
			winner={winner}
			resetBoard={resetBoard}
		/>
	)
}

export default OfflineGame
