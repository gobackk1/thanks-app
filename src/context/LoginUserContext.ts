import { createContext, SetStateAction } from 'react'
import * as T from '@/model/types'

export type State = {
  company: T.Company | null
  uid: string | null
}

export type ContextType = [State, React.Dispatch<SetStateAction<State>>]

export const Context = createContext<ContextType>([{ company: null, uid: null }, () => undefined])
