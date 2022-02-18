// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyCLgx2DPjVRTXnQspOKjM2lPkjsrt3RMpE',
	authDomain: 'miraculous-8ac58.firebaseapp.com',
	projectId: 'miraculous-8ac58',
	storageBucket: 'miraculous-8ac58.appspot.com',
	messagingSenderId: '263845183647',
	appId: '1:263845183647:web:3be26043e4d44951f122aa',
	measurementId: 'G-CE9XCCMCJK',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()

export const provider = new GoogleAuthProvider()
