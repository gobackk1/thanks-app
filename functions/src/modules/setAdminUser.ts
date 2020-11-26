import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

type SetAdminUserParams = {
  isAdmin: boolean
  uid: string
  password: string
}

module.exports.setAdminUser = functions
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
