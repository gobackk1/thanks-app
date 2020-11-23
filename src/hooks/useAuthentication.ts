import React from 'react'
import firebase from 'firebase'
import * as LoginUser from '@/context/LoginUserContext'

export const useAuthentication = () => {
  const [state, setState] = React.useContext(LoginUser.Context)

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        console.log(`debug: login ${user.uid}`)
        // NOTE: uid を見てログインを判断する
        setState(state => ({ ...state, uid: user.uid }))
      } else {
        // ログアウト時の処理
      }
    })
  }, [setState])
}
