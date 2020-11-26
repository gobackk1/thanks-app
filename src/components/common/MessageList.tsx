import { useMessagesState } from '@/hooks'
import React from 'react'

export const MessageList: React.FC = () => {
  const { getMessages } = useMessagesState()
  return (
    <div>
      {getMessages().map(message => (
        <div key={message.mid}>
          {message.text}
          <br />
          {message.point}
        </div>
      ))}
    </div>
  )
}
