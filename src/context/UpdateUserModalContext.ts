import React from 'react'

export type ContextType = {
  openUpdateUserModal: (user: any) => void
}

export const Context = React.createContext<ContextType>({
  openUpdateUserModal: () => undefined
})
