import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

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
