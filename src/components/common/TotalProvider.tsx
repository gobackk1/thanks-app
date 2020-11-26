import React from 'react'
import { LoginUserContextProvider } from './LoginUserContextProvider'
import { SnackbarProvider } from './SnackbarProvider'
import { UpdateUserModalProvider } from '@/components'
import { store } from '@/redux/store'
import { Provider as ReduxStoreProvider } from 'react-redux'

export const TotalProvider: React.FC = ({ children }) => {
  return (
    <ReduxStoreProvider store={store}>
      <LoginUserContextProvider>
        <SnackbarProvider
          autoHideDuration={5000}
          position={{ vertical: 'top', horizontal: 'center' }}
        >
          <UpdateUserModalProvider>{children}</UpdateUserModalProvider>
        </SnackbarProvider>
      </LoginUserContextProvider>
    </ReduxStoreProvider>
  )
}
