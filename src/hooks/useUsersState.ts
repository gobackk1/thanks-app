import React from 'react'
import { useSelector } from 'react-redux'
import * as LoginUser from '@/context/LoginUserContext'
import { UsersState, UserData } from '@/redux/users/reducer'

type ReturnType = {
  users: UsersState
  getUsers: () => UserData[]
  currentUser: UserData | null
}

export const useUsersState = (): ReturnType => {
  const usersState = useSelector(state => state.users)
  const [{ uid }] = React.useContext(LoginUser.Context)

  const users = React.useMemo(() => usersState, [usersState])

  const getUsers = React.useCallback(() => {
    return Object.values(users.data)
  }, [users.data])

  const currentUser = React.useMemo(() => (uid ? users.data[uid] : null), [uid, users.data])

  return { users, getUsers, currentUser }
}
