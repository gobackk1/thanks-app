import React from 'react'
import firebase from 'firebase'
import { useSnackbarContext } from '@/hooks'

type CreateUserFormValue = {
  email: string
  password: string
}

type ReturnType = {
  signup: (value: CreateUserFormValue) => void
}

export const useFirebase = (): ReturnType => {
  const { showSnackbar } = useSnackbarContext()

  const signup = React.useCallback(
    async ({ email, password }: CreateUserFormValue) => {
      const credit = await firebase.auth().createUserWithEmailAndPassword(email, password)
      await credit.user?.sendEmailVerification({
        url: 'http://localhost'
      })
      showSnackbar({
        message: '登録メールアドレスに確認メールを送信しました。',
        type: 'info'
      })
      dispatchEvent(new CustomEvent('closeModal'))
    },
    [showSnackbar]
  )

  return { signup }
}
