import React from 'react'
import * as LoginUser from '@/context/LoginUserContext'

export const LoginUserContextProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<LoginUser.State>({
    company: null,
    user: null
  })

  return (
    <LoginUser.Context.Provider value={[state, setState]}>{children}</LoginUser.Context.Provider>
  )
}
