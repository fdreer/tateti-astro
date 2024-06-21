import type { APIRoute } from 'astro'

const roomsId = ['primera-sala', 'segunda-sala']

// METODO PARA UNIRSE A UNA SALA QUE YA EXISTE
export const POST: APIRoute = ({ params }) => {
	const roomdId = params.id as string

	if (!roomsId.includes(roomdId)) {
		return new Response(JSON.stringify({ msg: 'La sala no existe' }), {
			status: 404
		})
	}

	return new Response(JSON.stringify({ msg: 'La sala existe' }), {
		status: 200
	})
}
