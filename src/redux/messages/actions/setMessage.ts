import { actionCreator } from '@/redux/actionCreator'
import * as T from '@/model/types'

export type SetMessageParams = {
  mid: string
  data: T.Message
}
export const setMessage = actionCreator<SetMessageParams>('SET_MESSAGE')
