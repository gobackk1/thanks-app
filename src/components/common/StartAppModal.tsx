import React from 'react'
import { Button } from '@material-ui/core'
import { AppModal } from '@/components'

export const StartAppModal: React.FC = () => {
  return (
    <AppModal title="始める" renderButton={props => <Button {...props}>button</Button>}>
      ここにフォーム
    </AppModal>
  )
}
