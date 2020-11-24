import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import * as LoginUser from '@/context/LoginUserContext'
import { useFirebase } from '@/hooks'

export const PrivateRoute: React.FC<RouteProps & { component: React.FC }> = ({
  component: Component,
  ...props
}) => {
  const [{ uid }] = React.useContext(LoginUser.Context)
  const { currentUser } = useFirebase()
  return currentUser ? (
    <Route {...props} render={() => (uid ? <Component /> : <Redirect to="/login" />)} />
  ) : null
}
