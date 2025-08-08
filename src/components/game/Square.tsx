import type { ReactNode } from 'preact/compat'

interface Props {
	index: number
	onPlay: (index: number) => void
	children: ReactNode
	disabled?: boolean
}

const Square = ({ index, onPlay, children, disabled = false }: Props) => {
	const handleClick = () => {
		if (!disabled) {
			onPlay(index)
		}
	}

	return (
		<article
			className={`square ${disabled ? 'disabled' : ''}`}
			onClick={handleClick}
		>
			{children}
		</article>
	)
}

export default Square
