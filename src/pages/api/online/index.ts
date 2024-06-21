import type { APIRoute } from 'astro'

// METODO QUE CREA SALAS
export const POST: APIRoute = async () => {
	console.log('Metodo GET funcionando')

	const roomId = crypto.randomUUID().split('-')[0]

	return new Response(JSON.stringify({ roomId: roomId }), { status: 201 })
}
