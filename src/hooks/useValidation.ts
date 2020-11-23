import React from 'react'

type ReturnType = {
  userName: {
    required: string
    maxLength: {
      value: number
      message: string
    }
    minLength: {
      value: number
      message: string
    }
  }
}

export const useValidation = (): ReturnType => {
  const userName = {
    required: 'ユーザー名は必須です',
    maxLength: {
      value: 30,
      message: 'ユーザー名は6~30字以内で入力してください'
    },
    minLength: {
      value: 6,
      message: 'ユーザー名は6~30字以内で入力してください'
    }
  }
  return { userName }
}
