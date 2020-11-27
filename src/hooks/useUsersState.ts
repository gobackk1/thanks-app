import React from 'react'
import { useSelector } from 'react-redux'
import * as LoginUser from '@/context/LoginUserContext'
import { UsersState, UserData } from '@/redux/users/reducer'

type ReturnType = {
  users: UsersState
  getUsers: () => UserData[]
  currentUser: UserData | null
  getUserById: (uid: string) => UserData | null
}

export const useUsersState = (): ReturnType => {
  const usersState = useSelector(state => state.users)
  const [{ uid }] = React.useContext(LoginUser.Context)

  const users = React.useMemo(() => usersState, [usersState])

  const getUsers = React.useCallback(() => {
    return Object.values(users.data)
  }, [users.data])

  const getUserById = React.useCallback(
    (uid: string) => {
      return getUsers().find(user => user.uid === uid) || null
    },
    [getUsers]
  )

  const currentUser = React.useMemo(() => (uid ? users.data[uid] : null), [uid, users.data])

  return { users, getUsers, currentUser, getUserById }
}
