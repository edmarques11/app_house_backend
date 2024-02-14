export default interface IAdvertisement {
  id: string
  active: number
  title: string
  description: string
  width: number
  length: number
  references: string
  phone_contact: string
  price: number
  immobile_id: string
  owner_id: string
  created_at: Date
  updated_at: Date
}
