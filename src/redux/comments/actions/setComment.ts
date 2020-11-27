import { actionCreator } from '@/redux/actionCreator'
import * as T from '@/model/types'

export type SetCommentParams = {
  cid: string
  mid: string
  data: T.Comment
}
export const setComment = actionCreator<SetCommentParams>('SET_COMMENT')
