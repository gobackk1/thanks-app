import React from 'react'
import { useSelector } from 'react-redux'
// import * as LoginUser from '@/context/LoginUserContext'
import { MessagesState, MessageData } from '@/redux/messages/reducer'

type ReturnType = {
  messages: MessagesState
  getMessages: () => MessageData[]
}

export const useMessagesState = (): ReturnType => {
  const messagesState = useSelector(state => state.messages)
  // const [{ uid }] = React.useContext(LoginUser.Context)

  const messages = React.useMemo(() => messagesState, [messagesState])

  const getMessages = React.useCallback(() => {
    return Object.values(messages.data).sort((x, y) => {
      console.log(x, y)
      // NOTE: message ドキュメント作成時は、nullになるので
      if (!x.createdAt || !y.createdAt) return 1
      return y.createdAt.seconds - x.createdAt.seconds
    })
  }, [messages.data])

  return { messages, getMessages }
}
