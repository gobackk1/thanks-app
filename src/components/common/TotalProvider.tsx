import React from 'react'
import { LoginUserContextProvider } from './LoginUserContextProvider'
import { SnackbarProvider } from './SnackbarProvider'

export const TotalProvider: React.FC = ({ children }) => {
  return (
    <LoginUserContextProvider>
      <SnackbarProvider
        autoHideDuration={5000}
        position={{ vertical: 'top', horizontal: 'center' }}
      >
        {children}
      </SnackbarProvider>
    </LoginUserContextProvider>
  )
}
