import { useFirebase } from '@/hooks'
import { Button } from '@material-ui/core'
import React from 'react'

export const Home: React.FC = () => {
  const { logout } = useFirebase()
  return (
    <div>
      <Button onClick={logout}>ログアウト</Button>
    </div>
  )
}
