import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { setComment } from './actions'
import * as T from '@/model/types'

export type CommentData = T.Comment & {
  cid: string
  createdAt: { seconds: number; nanoseconds: number }
}

export interface CommentsState {
  data: {
    [mid: string]: CommentData
  }
}

const initialState: CommentsState = {
  data: {}
}

export const commentsReducer = reducerWithInitialState(initialState).case(
  setComment,
  (state, { cid, data, mid }) => ({
    ...state,
    data: {
      ...state.data,
      [cid]: {
        //TODO: serverTimestamp の型
        ...(data as any),
        cid,
        mid
      }
    }
  })
)
