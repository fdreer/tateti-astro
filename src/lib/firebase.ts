// firebase.ts
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import {
	getAuth,
	signInAnonymously,
	onAuthStateChanged,
	type User
} from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyDG7lch0XvGPgTV9crHOc2Bj3LkPYTXd5U',
	authDomain: 'tateti-a6af0.firebaseapp.com',
	databaseURL: 'https://tateti-a6af0-default-rtdb.firebaseio.com',
	projectId: 'tateti-a6af0',
	storageBucket: 'tateti-a6af0.firebasestorage.app',
	messagingSenderId: '942395447408',
	appId: '1:942395447408:web:16c0055233e9fb6684bcb5'
}

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
