import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as serviceAccount from './serviceAccount.json'
import { HttpsError } from 'firebase-functions/lib/providers/https'
// import firebase from 'firebase'

admin.initializeApp({
  databaseURL: 'https://thanks-app-d91d5.firebaseio.com',
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

export const onCreateUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async user => {
    /**
     * NOTE: 公開するユーザーの情報は user ドキュメントに持たせる
     */
    const userdata = {
      name: 'userName',
      email: user.email,
      profile: 'プロフィールを入力してください',
      avatarURL: '初期値を探す',
      points: {
        available: 100,
        recieved: 0
      },
      isAdmin: false
    }
    try {
      await admin
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set(userdata)
    } catch (error) {
      console.error('error occurred', error)
      throw new HttpsError('internal', 'internal server error')
    }
  })

export const onDeleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async user => {
    try {
      await admin
        .firestore()
        .collection('users')
        .doc(user.uid)
        .delete()
    } catch (error) {
      console.error('error occurred', error)
      throw new HttpsError('internal', 'internal server error')
    }
  })

type SetAdminUserParams = {
  isAdmin: boolean
  uid: string
  password: string
}
export const setAdminUser = functions
  .region('asia-northeast1')
  .https.onCall(async (data: SetAdminUserParams, context) => {
    if (!context.auth) return { error: 'Not authorized.' }
    if (data.password !== 'password') return { error: 'wrong password' }
    try {
      const customClaims = {
        admin: data.isAdmin
      }
      await admin.auth().setCustomUserClaims(data.uid, customClaims)
      await admin
        .firestore()
        .collection('users')
        .doc(data.uid)
        .set({ isAdmin: data.isAdmin }, { merge: true })
      return { message: 'success' }
    } catch (error) {
      return { error, data }
    }
  })

export const createUser = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    if (!context.auth) return { error: 'Not authorized.' }
    try {
      await admin.auth().createUser({ email: data.email, password: data.password })
      return { message: 'success' }
    } catch (error) {
      return { error }
    }
  })

export const deleteUser = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    if (!context.auth) return { error: 'Not authorized.' }
    try {
      await admin.auth().deleteUser(data.uid)
      return { message: 'success' }
    } catch (error) {
      return { error }
    }
  })

export const updateUser = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    if (!context.auth) return { error: 'Not authorized.' }
    try {
      await admin
        .firestore()
        .collection('users')
        .doc(data.uid)
        .update({ name: data.name })
      return { message: 'success' }
    } catch (error) {
      return { error }
    }
  })
