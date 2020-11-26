import { useFirebase, useUsersState } from '@/hooks'
import { Button, MenuItem, Paper, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const options = [5, 10, 15, 20, 25]

export const MessageForm: React.FC = () => {
  const { register, control, handleSubmit } = useForm()
  const { getUsers } = useUsersState()
  const { sendMessage } = useFirebase()

  return (
    <form onSubmit={handleSubmit(sendMessage)}>
      <Paper>
        MessageForm
        <Controller
          as={
            <TextField select fullWidth label="送るポイントを選択" variant="filled">
              {options.map(option => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          }
          control={control}
          name="point"
          defaultValue="10"
        />
        <Controller
          as={
            <TextField select fullWidth label="ユーザーを選択" variant="filled">
              {getUsers().map(user => (
                <MenuItem value={user.uid} key={user.uid}>
                  {user.name}
                  {user.email}
                </MenuItem>
              ))}
            </TextField>
          }
          control={control}
          name="uid"
        />
        <TextField name="text" label="メッセージ" multiline rows={4} inputRef={register} />
        <Button type="submit">送る</Button>
      </Paper>
    </form>
  )
}
