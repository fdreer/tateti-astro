import supabase from '@/lib/supabase'
import type { APIRoute } from 'astro'

// METODO PARA UNIRSE A UNA SALA QUE YA EXISTE
export const POST: APIRoute = ({ params }) => {
	const roomdId = params.id as string
	const room = supabase.channel(roomdId)

	// if (!roomsId.includes(roomdId)) {
	// 	return new Response(JSON.stringify({ msg: 'La sala no existe' }), {
	// 		status: 404
	// 	})
	// }

	return new Response(JSON.stringify({ msg: 'La sala existe' }), {
		status: 200
	})
}
