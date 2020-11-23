import React from 'react'
import { useFirebase } from '@/hooks'
import { TextField, Button, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'

export const Login: React.FC = () => {
  const { register, errors, handleSubmit } = useForm()
  const { login } = useFirebase()
  return (
    <form onSubmit={handleSubmit(login)}>
      <Typography variant="h4">ログイン</Typography>
      <TextField
        name="email"
        inputRef={register}
        error={!!errors.email}
        type="email"
        label="メールアドレス"
        helperText={errors.email?.message}
        variant="filled"
        required
        fullWidth
      />
      <br />
      <TextField
        name="password"
        inputRef={register}
        error={!!errors.password}
        type="password"
        label="パスワード"
        helperText={errors.password?.message}
        variant="filled"
        required
        fullWidth
      />
      <Button type="submit" variant="outlined">
        ログイン
      </Button>
    </form>
  )
}
