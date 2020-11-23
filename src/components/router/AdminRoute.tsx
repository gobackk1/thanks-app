import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import * as LoginUser from '@/context/LoginUserContext'

export const AdminRoute: React.FC<RouteProps & { component: React.FC }> = ({
  component: Component,
  ...props
}) => {
  const [{ isAdmin, isLoggingIn }] = React.useContext(LoginUser.Context)
  return isLoggingIn ? null : (
    <Route {...props} render={() => (isAdmin ? <Component /> : <Redirect to="/company" />)} />
  )
}
