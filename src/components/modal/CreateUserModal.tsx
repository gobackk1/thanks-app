import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { AppModal } from '@/components'
import { useFirebase } from '@/hooks'
import { useForm } from 'react-hook-form'

export const CreateUserModal: React.FC = () => {
  const { register, handleSubmit, errors } = useForm()
  const { createUser } = useFirebase()
  const check = async (values: any) => {
    await createUser(values as { email: string; password: string })
  }
  return (
    <AppModal title="始める" renderButton={props => <Button {...props}>ユーザーを作成する</Button>}>
      <form onSubmit={handleSubmit(check)}>
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
        <br />
        <Button type="submit">登録</Button>
      </form>
    </AppModal>
  )
}
