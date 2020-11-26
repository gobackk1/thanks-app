import 'react-redux'
import { UsersState } from '@/redux/users/reducer'

declare module 'react-redux' {
  interface DefaultRootState {
    users: UsersState
  }
}
