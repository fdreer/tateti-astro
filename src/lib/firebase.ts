// firebase.ts
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

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
