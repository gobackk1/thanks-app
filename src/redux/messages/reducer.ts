import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { setMessage } from './actions'
import * as T from '@/model/types'

export type MessageData = T.Message & {
  mid: string
  createdAt: { seconds: number; nanoseconds: number }
}

export interface MessagesState {
  data: {
    [mid: string]: MessageData
  }
}

const initialState: MessagesState = {
  data: {}
}

export const messagesReducer = reducerWithInitialState(initialState).case(
  setMessage,
  (state, { mid, data }) => ({
    ...state,
    data: {
      ...state.data,
      [mid]: {
        //TODO: serverTimestamp の型
        ...(data as any),
        mid
      }
    }
  })
)
