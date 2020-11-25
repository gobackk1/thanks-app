import { useFirebase } from '@/hooks'
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

export const ManageUsers: React.FC = () => {
  const { getUsers } = useFirebase()
  const [users, setUsers] = React.useState<T.User[]>([])

  const fetchUsersData = React.useCallback(async () => {
    setUsers(await getUsers())
  }, [setUsers, getUsers])

  React.useEffect(() => {
    fetchUsersData()
  }, [fetchUsersData])

  return (
    <>
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
                  <IconButton onClick={() => console.log(user)}>
                    <Visibility />
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
