import firebase from 'firebase/app'

export type Comment = {
  text: string
  mid: string
  createdAt: firebase.firestore.FieldValue
  senderRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}
