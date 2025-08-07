import supabase from '@/lib/supabase'
import type { APIRoute } from 'astro'

// METODO QUE CREA SALAS
export const POST: APIRoute = async () => {
	const room_id = crypto.randomUUID().split('-')[0]

	// const { data, error, status } = await supabase
	// 	.from('rooms')
	// 	.insert({ room_id, current_turn: 'o', board: ['x', 'x'], players: 1 })

	// console.log(data, error, status)

	const newChannel = supabase.channel(room_id)

	// console.log(newChannel)

	return new Response(JSON.stringify({ room_id }), { status: 201 })
}
