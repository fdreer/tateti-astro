import type { ReactNode } from 'preact/compat'

interface Props {
	index: number
	onPlay: (index: number) => void
	children: ReactNode
}

const Square = ({ index, onPlay, children }: Props) => {
	const handleClick = () => {
		onPlay(index)
	}

	return (
		<article className="square" onClick={handleClick}>
			{children}
		</article>
	)
}

export default Square
