import type { ReactNode } from 'preact/compat'

import './Button.css'

interface Props {
	isAnchor?: boolean
	href?: string
	children: ReactNode
	onClick?: () => void
}

const Button = ({ isAnchor, href, children, onClick }: Props) => {
	if (isAnchor) {
		return (
			<a class="btn" href={href}>
				{children}
			</a>
		)
	}

	return (
		<button className="btn" onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
