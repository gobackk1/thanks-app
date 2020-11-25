import { reducerWithInitialState } from 'typescript-fsa-reducers'
import {} from './actions'

export interface UsersState {
  data: any
}

const initialState: UsersState = {
  data: []
}

export const usersReducer = reducerWithInitialState(initialState)
