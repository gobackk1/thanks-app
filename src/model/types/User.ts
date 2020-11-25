export type User = {
  name: string
  email: string
  profile: string
  avatarURL: string
  points: {
    available: number
    recieved: number
  }
  isAdmin: boolean
}
