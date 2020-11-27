import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
  Reducer,
  CombinedState
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { DefaultRootState } from 'react-redux'
import { usersReducer } from './users/reducer'
import { messagesReducer } from './messages/reducer'
import { commentsReducer } from './comments/reducer'

const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)

const reducers: Reducer<CombinedState<DefaultRootState>, AnyAction> = combineReducers<
  DefaultRootState,
  AnyAction
>({
  users: usersReducer,
  messages: messagesReducer,
  comments: commentsReducer
})

export const store = createStore(reducers, enhancer)
