import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { AppModal } from '@/components'
import { useForm } from 'react-hook-form'
import { useFirebase } from '@/hooks'

export const StartAppModal: React.FC = () => {
  const { register, handleSubmit, errors } = useForm()
  const { signup } = useFirebase()

  return (
    <AppModal title="始める" renderButton={props => <Button {...props}>button</Button>}>
      <form onSubmit={handleSubmit(signup)}>
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
        <Button type="submit">登録</Button>
      </form>
    </AppModal>
  )
}
