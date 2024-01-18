export default interface IUpdateAdvertisementDTO {
  id: string
  title: string
  description: string
  width: number
  length: number
  references: string
  phone_contact: string
  price: number
  images: string[]
}
