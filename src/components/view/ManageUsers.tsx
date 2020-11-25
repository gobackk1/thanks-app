import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core'
import React from 'react'
import * as T from '@/model/types'
import { Visibility } from '@material-ui/icons'
import { CreateUserModal } from '@/components'
import firebase from 'firebase/app'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'
import { useFirebase } from '@/hooks'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import * as UpdateUserModal from '@/context/UpdateUserModalContext'

type User = T.User & { uid: string }

export const ManageUsers: React.FC = () => {
  // TODO ここのstate は redux に移すかも
  const [users, setUsers] = React.useState<User[]>([])
  const { deleteUser } = useFirebase()
  const { openUpdateUserModal } = React.useContext(UpdateUserModal.Context)

  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        for (const change of querySnapshot.docChanges()) {
          if (change.type === 'added') {
            setUsers(users => [...users, { ...change.doc.data(), uid: change.doc.id } as User])
          } else if (change.type === 'modified') {
            setUsers(users =>
              users.map(user => {
                const changeData = change.doc.data() as T.User
                const uid = change.doc.id
                if (user.uid === uid) {
                  return { ...changeData, uid }
                }
                return user
              })
            )
          } else if (change.type === 'removed') {
            setUsers(users => users.filter(user => user.email !== change.doc.data().email))
          }
        }
      })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      <CreateUserModal />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ユーザー名</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>権限</TableCell>
              <TableCell>編集</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.email}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? '管理者' : '-'}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      openUpdateUserModal(user)
                      console.log('buttonClick', user.uid)
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteUser(user.uid)}>
                    <HighlightOffRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
