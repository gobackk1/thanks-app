import { useMessagesState, useUsersState } from '@/hooks'
import React from 'react'

export const MessageList: React.FC = () => {
  const { getMessages } = useMessagesState()
  const { getUserById } = useUsersState()
  return (
    <div>
      {getMessages().map(message => {
        const reciever = getUserById(message.recieverRef.id)
        return (
          <div key={message.mid}>
            {message.point}
            {reciever?.avatarURL}
            {reciever?.name}
            {message.text}
            <br />
          </div>
        )
      })}
    </div>
  )
}
