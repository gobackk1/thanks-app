import React from 'react'

type ReturnType = {
  // TODO: 型をつける
  userName: any
}

export const useValidation = (): ReturnType => {
  const userName = React.useMemo(
    () => ({
      required: 'ユーザー名は必須です',
      maxLength: {
        value: 30,
        message: 'ユーザー名は6~30字以内で入力してください'
      },
      minLength: {
        value: 6,
        message: 'ユーザー名は6~30字以内で入力してください'
      }
    }),
    []
  )
  return { userName }
}
