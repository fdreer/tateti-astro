import { Turn } from '@/consts'
import Cursor from '../Cursor.astro'

const SwitchTurn = () => {
	return (
		<section>
			<article>
				<div className="slide-turn">
					<Cursor />
				</div>
			</article>
			<article>
				<p>{Turn.X}</p>
				<p>{Turn.O}</p>
			</article>
		</section>
	)
}

export default SwitchTurn
