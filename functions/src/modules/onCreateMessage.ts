import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { HttpsError } from 'firebase-functions/lib/providers/https'
import { User } from '../index'

type DocumentData = FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>

module.exports.onCreateMessage = functions
  .runWith({ memory: '1GB' })
  .region('asia-northeast1')
  .firestore.document('users/{uid}/messages/{message_id}')
  .onCreate(async snap => {
    const messageData = snap.data()

    try {
      admin.firestore().runTransaction(async t => {
        const operations: Promise<void>[] = []

        operations.push(
          t.get(messageData.senderRef as DocumentData).then(doc => {
            const data = doc.data() as User
            const newPoints = {
              ...data.points,
              available: data.points.available - messageData.point
            }
            t.update(messageData.senderRef, { points: newPoints })
          })
        )

        operations.push(
          t.get(messageData.recieverRef as DocumentData).then(doc => {
            const data = doc.data() as User
            const newPoints = {
              ...data.points,
              recieved: data.points.recieved + messageData.point
            }
            t.update(messageData.recieverRef, { points: newPoints })
          })
        )

        await Promise.all(operations)
          .then(() => console.info('transaction success'))
          .catch(error => console.error('transaction error', error))
      })
    } catch (error) {
      console.error('error occurred', error)
      throw new HttpsError('internal', 'internal server error')
    }
  })
