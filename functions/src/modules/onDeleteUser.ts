import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { HttpsError } from 'firebase-functions/lib/providers/https'

module.exports.onDeleteUser = functions
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
