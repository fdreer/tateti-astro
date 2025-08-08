// firebase.ts
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import {
	getAuth,
	signInAnonymously,
	onAuthStateChanged,
	type User
} from 'firebase/auth'

const firebaseConfig = {}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const auth = getAuth(app)

/**
 * Asegura un userId anónimo. Retorna la UID.
 * Útil para identificar jugadores sin auth completa.
 */
export async function ensureAnonUser(): Promise<User> {
	return new Promise((resolve, reject) => {
		onAuthStateChanged(auth, (user) => {
			if (user) resolve(user)
		})
		signInAnonymously(auth).catch((err) => {
			// si ya habia una sesión anónima esto puede fallar, onAuthStateChanged la capturará
			// pero reportamos error si ocurre
			console.warn('signInAnonymously error', err)
		})
	})
}
