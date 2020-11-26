import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { setUser, deleteUser } from './actions'
import * as T from '@/model/types'

export type UserData = { uid: string } & T.User

export interface UsersState {
  data: {
    [uid: string]: UserData
  }
}

const initialState: UsersState = {
  data: {}
}

export const usersReducer = reducerWithInitialState(initialState)
  .case(setUser, (state, { uid, data }) => ({
    ...state,
    data: { ...state.data, [uid]: { ...data, uid } }
  }))
  .case(deleteUser, (state, params) => {
    /* eslint-disable-next-line */
    const { [params]: _, ...withoutParams } = state.data
    return { ...state, data: withoutParams }
  })
