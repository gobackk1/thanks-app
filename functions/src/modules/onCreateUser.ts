import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { HttpsError } from 'firebase-functions/lib/providers/https'

module.exports.onCreateUser = functions
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
