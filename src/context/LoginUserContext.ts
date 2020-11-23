import { createContext, SetStateAction } from 'react'
// import * as T from '@/model/types'

export type State = {
  isAdmin: boolean
  uid: string | null
  isLoggingIn: boolean
}

export type ContextType = [State, React.Dispatch<SetStateAction<State>>]

export const Context = createContext<ContextType>([
  { isAdmin: false, uid: null, isLoggingIn: true },
  () => undefined
])
