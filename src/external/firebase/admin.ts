import admin from 'firebase-admin'

let firebaseKeys = {};
try {
  firebaseKeys = require('~/external/firebase/config/firebase_keys.json')
} catch {
  firebaseKeys = JSON.parse(process.env.FIREBASE_KEYS as string)
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseKeys as any),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
})

export default admin
