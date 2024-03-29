import IAddress from "~/core/address/model/IAddress"
import type IImage from "~/core/image/model/IImage"
import type IImobile from "~/core/immobile/Model/IImmobile"

interface ImmobileWithAddress extends IImobile {
  address: IAddress
}
export default interface IAdvertisementData {
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
  immobile: ImmobileWithAddress
  images: IImage[]
}
