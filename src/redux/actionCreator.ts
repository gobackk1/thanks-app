import { actionCreatorFactory } from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import firebase from 'firebase/app'

/**
 * 各アクションで利用するファクトリメソッド
 */
export const actionCreator = actionCreatorFactory()
export const asyncActionCreator = asyncFactory(actionCreator)

export const db = firebase.firestore()
