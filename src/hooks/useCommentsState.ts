import React from 'react'
import { useSelector } from 'react-redux'
// import * as LoginUser from '@/context/LoginUserContext'
import { CommentsState, CommentData } from '@/redux/comments/reducer'

type ReturnType = {
  comments: CommentData[]
  getCommentsByMid: (mid: string) => CommentData[]
}

export const useCommentsState = (): ReturnType => {
  const commentsState = useSelector(state => state.comments)

  const data = React.useMemo(() => commentsState.data, [commentsState.data])

  const comments = React.useMemo(() => {
    return Object.values(data).sort((x, y) => {
      // NOTE: message ドキュメント作成時は、nullになるので
      if (!x.createdAt || !y.createdAt) return 1
      return y.createdAt.seconds - x.createdAt.seconds
    })
  }, [data])

  const getCommentsByMid = React.useCallback(
    (mid: string) => {
      return comments.filter(comment => comment.mid === mid)
    },
    [comments]
  )

  return { comments, getCommentsByMid }
}
