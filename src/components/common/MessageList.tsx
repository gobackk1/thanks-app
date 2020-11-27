import { useFirebase, useMessagesState, useUsersState } from '@/hooks'
import { Button, createStyles, makeStyles, Paper } from '@material-ui/core'
import React from 'react'

export const MessageList: React.FC = () => {
  const { messages } = useMessagesState()
  const { getUserById } = useUsersState()
  const { subscribeMessages } = useFirebase()
  const styles = useStyles()

  const nextPage = React.useCallback(() => {
    subscribeMessages(messages.slice(-1)[0])
  }, [subscribeMessages, messages])

  return (
    <div>
      {messages.map(message => {
        const reciever = getUserById(message.recieverRef.id)
        return (
          <Paper className={styles.item} key={message.mid}>
            {message.point}
            {reciever?.avatarURL}
            {reciever?.name}
            {message.text}
            {message.createdAt?.seconds}
            <br />
          </Paper>
        )
      })}
      <Button onClick={nextPage}>次の10件</Button>
    </div>
  )
}

const useStyles = makeStyles(theme =>
  createStyles({
    item: {
      height: 200,
      backgroundColor: '#ccc',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
)
