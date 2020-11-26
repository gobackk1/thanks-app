import * as admin from 'firebase-admin'
import * as serviceAccount from './serviceAccount.json'

admin.initializeApp({
  databaseURL: 'https://thanks-app-d91d5.firebaseio.com',
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

const files = {
  onCreateUser: './modules/onCreateUser',
  onCreateMessage: './modules/onCreateMessage',
  onDeleteUser: './modules/onDeleteUser',
  setAdminUser: './modules/setAdminUser',
  createUser: './modules/createUser',
  deleteUser: './modules/deleteUser',
  updateUser: './modules/updateUser'
}

/**
 * 参考
 * https://qiita.com/gaku3601/items/4c887f30804ce8c83cbe
 */
const load = (files: { [i: string]: string }) => {
  for (const key in files) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME.startsWith(key)) {
      module.exports[key] = require(files[key])
    }
  }
}

load(files)

//TODO: project の型と共有したい
export type User = {
  name: string
  email: string
  profile: string
  avatarURL: string
  points: {
    available: number
    recieved: number
  }
  isAdmin: boolean
}
