export default interface IUser {
  id?: string
  name: string
  email: string
  profile_image_id: string | null
  password: string
  created_at: Date
  updated_at: Date
}
