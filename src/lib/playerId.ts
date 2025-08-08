// src/lib/playerId.ts
export function getPlayerId(): string {
	// Si no estamos en el navegador, devolvemos un valor por defecto
	if (typeof window === 'undefined' || !window.localStorage) {
		return '' // o algún ID “dummy”
	}

	let id = window.localStorage.getItem('playerId')
	if (!id) {
		id =
			crypto.randomUUID?.() ?? 'player-' + Math.random().toString(36).slice(2)
		window.localStorage.setItem('playerId', id)
	}
	return id
}
