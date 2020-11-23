import React from 'react'
import firebase from 'firebase'
import { useSnackbarContext } from '@/hooks'
import * as T from '@/model/types'
import * as LoginUser from '@/context/LoginUserContext'
import { useHistory } from 'react-router-dom'

type LoginFormValue = {
  email: string
  password: string
}

type ReturnType = {
  signup: (value: LoginFormValue) => Promise<void>
  login: (value: LoginFormValue) => Promise<void>
  createCompany: (name: string) => Promise<void>
  logout: () => Promise<void>
}

const db = firebase.firestore()

export const useFirebase = (): ReturnType => {
  const { showSnackbar } = useSnackbarContext()
  const [state, setState] = React.useContext(LoginUser.Context)
  const history = useHistory()

  const login = React.useCallback(
    async ({ email, password }: LoginFormValue) => {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      history.push('company')
    },
    [history]
  )

  const logout = React.useCallback(async () => {
    if (!confirm('本当にログアウトしますか?')) return
    await firebase.auth().signOut()
  }, [])

  const signup = React.useCallback(
    async ({ email, password }: LoginFormValue) => {
      const credit = await firebase.auth().createUserWithEmailAndPassword(email, password)
      await credit.user?.sendEmailVerification({
        url: 'http://localhost:8080/registration'
      })
      showSnackbar({
        message: '登録メールアドレスに確認メールを送信しました。',
        type: 'info'
      })
      dispatchEvent(new CustomEvent('closeModal'))
    },
    [showSnackbar]
  )

  const createCompany = React.useCallback(
    async (name: string) => {
      const company: T.Company = {
        name,
        profile: 'プロフィールを入力してください',
        // 初期画像探す
        avatarURL: 'default'
      }
      await db.collection('company').add(company)
      setState(state => ({ ...state, company }))
      history.push('company')
    },
    [setState, history]
  )

  return { signup, createCompany, login, logout }
}
