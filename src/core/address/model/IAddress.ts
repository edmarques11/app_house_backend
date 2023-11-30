export default interface IAddress {
  id?: string
  zip_code: string
  public_place: string
  complement: string | null
  district: string
  state: string
  uf: string
  created_at: Date
  updated_at: Date
}
