import React from 'react'
import { useSelector } from 'react-redux'

export const useUsersState = () => {
  const usersState = useSelector(state => state.users)

  const users = React.useMemo(() => usersState, [usersState])

  const getUsers = React.useCallback(() => {
    return Object.values(users.data)
  }, [users.data])

  return { users, getUsers }
}
