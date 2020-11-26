import firebase from 'firebase/app'

export type Message = {
  text: string
  point: number
  createdAt: firebase.firestore.FieldValue
  senderRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  recieverRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  likes: number
}
