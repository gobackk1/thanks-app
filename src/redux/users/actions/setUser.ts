import { actionCreator } from '@/redux/actionCreator'
import * as T from '@/model/types'

export type SetUserParams = {
  uid: string
  data: T.User
}
export const setUser = actionCreator<SetUserParams>('SET_USER')
