import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import * as LoginUser from '@/context/LoginUserContext'

export const PrivateRoute: React.FC<RouteProps & { component: React.FC }> = ({
  component: Component,
  ...props
}) => {
  const [{ uid, isLoggingIn }] = React.useContext(LoginUser.Context)
  return isLoggingIn ? null : (
    <Route {...props} render={() => (uid ? <Component /> : <Redirect to="/login" />)} />
  )
}
