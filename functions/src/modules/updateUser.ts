import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

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
