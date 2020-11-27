import 'react-redux'
import { UsersState } from '@/redux/users/reducer'
import { MessagesState } from '@/redux/messages/reducer'
import { CommentsState } from '@/redux/comments/reducer'

declare module 'react-redux' {
  interface DefaultRootState {
    users: UsersState
    messages: MessagesState
    comments: CommentsState
  }
}
