import admin from 'firebase-admin'
import firebaseKeys from '~/external/firebase/config/firebase_keys.json'

admin.initializeApp({
  credential: admin.credential.cert(firebaseKeys as any),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
})

export default admin
