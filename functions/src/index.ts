import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as serviceAccount from './serviceAccount.json'
import { HttpsError } from 'firebase-functions/lib/providers/https'

admin.initializeApp({
  databaseURL: 'https://thanks-app-d91d5.firebaseio.com',
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

export const onCreateUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async user => {
    /**
     * NOTE: 後悔するユーザーの情報は user ドキュメントに持たせる
     */
    const userdata = {
      name: 'userName',
      email: user.email,
      profile: 'プロフィールを入力してください',
      avatarURL: '初期値を探す',
      points: {
        available: 100,
        recieved: 0
      }
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

export const setAdminUser = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    if (!context.auth) return { error: 'Not authorized.' }
    if (data.password !== 'password') return { error: 'wrong password' }
    try {
      const customClaims = {
        admin: true
      }
      await admin.auth().setCustomUserClaims(data.uid, customClaims)
      return { message: 'success' }
    } catch (error) {
      return { error }
    }
  })
