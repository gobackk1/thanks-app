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
import { CreateUserModal } from '@/components'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'
import { useFirebase } from '@/hooks'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import * as UpdateUserModal from '@/context/UpdateUserModalContext'
import { useUsersState } from '@/hooks/useUsersState'

export const ManageUsers: React.FC = () => {
  const { deleteUser } = useFirebase()
  const { openUpdateUserModal } = React.useContext(UpdateUserModal.Context)
  const { getUsers } = useUsersState()

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
            {getUsers().map(user => (
              <TableRow key={user.email}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? '管理者' : '-'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openUpdateUserModal(user)}>
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
