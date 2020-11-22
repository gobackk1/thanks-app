export type User = {
  name: string
  email: string
  profile: string
  avatarURL: string
  isAdmin: boolean
  points: {
    available: number
    recieved: number
  }
}
