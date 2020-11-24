import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import * as LoginUser from '@/context/LoginUserContext'
import { useFirebase } from '@/hooks'

export const AdminRoute: React.FC<RouteProps & { component: React.FC }> = ({
  component: Component,
  ...props
}) => {
  const [{ isAdmin }] = React.useContext(LoginUser.Context)
  const { currentUser } = useFirebase()
  return currentUser ? (
    <Route {...props} render={() => (isAdmin ? <Component /> : <Redirect to="/company" />)} />
  ) : null
}
