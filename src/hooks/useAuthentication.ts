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

        const result = await user.getIdTokenResult(true)
        if (result.claims.admin === true) {
          setState(state => ({ ...state, uid: user.uid, isAdmin: true, isLoggingIn: false }))
        } else {
          // NOTE: uid を見てログインを判断する
          setState(state => ({ ...state, uid: user.uid, isAdmin: false, isLoggingIn: false }))
        }
      } else {
        console.log(`debug: logout`)
        setState(state => ({ ...state, uid: null, isLogginIn: false }))
        history.push('/login')
      }
    })
  }, [setState, history])
}
