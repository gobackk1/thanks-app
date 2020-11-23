import React from 'react'
import firebase from 'firebase'
import * as LoginUser from '@/context/LoginUserContext'
import { useHistory } from 'react-router-dom'

export const useAuthentication = () => {
  const [state, setState] = React.useContext(LoginUser.Context)
  const history = useHistory()

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        console.log(`debug: login ${user.uid}`)
        // NOTE: uid を見てログインを判断する
        setState(state => ({ ...state, uid: user.uid }))
        history.push('company')
      } else {
        // ログアウト時の処理
        setState(state => ({ ...state, uid: null }))
        history.push('login')
      }
    })
  }, [setState, history])
}
