import { useFirebase } from '@/hooks'
import { Button, TextField } from '@material-ui/core'
import React from 'react'

export const Registration: React.FC = () => {
  const { createCompany } = useFirebase()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const onClick = () => {
    if (inputRef.current) createCompany(inputRef.current.value)
  }
  return (
    <div>
      <div>会社、または組織名を入力してください</div>
      <TextField inputRef={inputRef} />
      <Button onClick={onClick}>登録</Button>
    </div>
  )
}
