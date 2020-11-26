import React from 'react'
import firebase from 'firebase'
import { useSnackbarContext } from '@/hooks'
import * as T from '@/model/types'
import * as LoginUser from '@/context/LoginUserContext'
import { useHistory } from 'react-router-dom'
import { setUser, deleteUser as deleteUserAction } from '@/redux/users/actions'
import { setMessage } from '@/redux/messages/actions'
import { useDispatch } from 'react-redux'

type Authentication = {
  email: string
  password: string
}

type SendMessageParams = {
  uid: string
  point: number
  text: string
}

type ReturnType = {
  signup: (value: Authentication) => Promise<void>
  login: (value: Authentication) => Promise<void>
  logout: () => Promise<void>
  setAdminUser: (param: { password: string; uid: string; isAdmin: boolean }) => Promise<void>
  currentUser: firebase.User | null
  getUsers: () => Promise<T.User[]>
  createUser: (value: Authentication) => Promise<void>
  deleteUser: (uid: string) => Promise<void>
  updateUser: (user: any) => Promise<void>
  subscribeUsers: () => void
  subscribeMessages: () => void
  sendMessage: (message: SendMessageParams) => Promise<void>
}

const db = firebase.firestore()

export const useFirebase = (): ReturnType => {
  const { showSnackbar } = useSnackbarContext()
  const [state, setState] = React.useContext(LoginUser.Context)
  const history = useHistory()
  const dispatch = useDispatch()

  const login = React.useCallback(
    async ({ email, password }: Authentication) => {
      setState(state => ({ ...state, isLoggingIn: true }))
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        history.push('/company')
      } catch (e) {
        // todo error handling
        setState(state => ({ ...state, isLoggingIn: false }))
      }
    },
    [history, setState]
  )

  const logout = React.useCallback(async () => {
    if (!confirm('本当にログアウトしますか?')) return
    await firebase.auth().signOut()
    setState(state => ({ ...state, isLoggingIn: false }))
  }, [setState])

  const signup = React.useCallback(
    async ({ email, password }: Authentication) => {
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

  const setAdminUser = React.useCallback(async params => {
    const result = await firebase
      .app()
      .functions('asia-northeast1')
      .httpsCallable('setAdminUser-setAdminUser')(params)
    console.log('setAdminUser', result)
  }, [])

  const currentUser = firebase.auth().currentUser

  const getUsers = React.useCallback(async () => {
    const users: T.User[] = []
    const snapshot = await db.collection('users').get()
    snapshot.forEach(doc => {
      users.push(doc.data() as T.User)
    })
    return users
  }, [])

  const createUser = React.useCallback(async (values: Authentication) => {
    await firebase
      .app()
      .functions('asia-northeast1')
      .httpsCallable('createUser-createUser')(values)
  }, [])

  const deleteUser = React.useCallback(async (uid: string) => {
    await firebase
      .app()
      .functions('asia-northeast1')
      .httpsCallable('deleteUser-deleteUser')({ uid })
  }, [])

  const updateUser = React.useCallback(async user => {
    await firebase
      .app()
      .functions('asia-northeast1')
      .httpsCallable('updateUser-updateUser')({ uid: user.uid, name: user.name })
  }, [])

  const sendMessage = React.useCallback(
    async params => {
      if (!currentUser) return

      const message: T.Message = {
        text: params.text,
        point: Number(params.point),
        senderRef: db.collection('users').doc(currentUser.uid),
        recieverRef: db.collection('users').doc(params.uid),
        likes: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }

      await db.collection(`users/${currentUser.uid}/messages`).add(message)
    },
    [currentUser]
  )

  const subscribeUsers = React.useCallback(() => {
    db.collection('users').onSnapshot(querySnapshot => {
      for (const change of querySnapshot.docChanges()) {
        if (change.type === 'added') {
          dispatch(setUser({ data: change.doc.data() as T.User, uid: change.doc.id }))
        } else if (change.type === 'modified') {
          dispatch(setUser({ data: change.doc.data() as T.User, uid: change.doc.id }))
        } else if (change.type === 'removed') {
          dispatch(deleteUserAction(change.doc.id))
        }
      }
    })
  }, [dispatch])

  const subscribeMessages = React.useCallback(() => {
    db.collectionGroup('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        for (const change of querySnapshot.docChanges()) {
          if (change.type === 'added') {
            dispatch(setMessage({ data: change.doc.data() as T.Message, mid: change.doc.id }))
          } else if (change.type === 'modified') {
            dispatch(setMessage({ data: change.doc.data() as T.Message, mid: change.doc.id }))
          } else if (change.type === 'removed') {
            // TODO:
          }
        }
      })
  }, [dispatch])

  return {
    signup,
    login,
    logout,
    setAdminUser,
    currentUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    subscribeUsers,
    subscribeMessages,
    sendMessage
  }
}
