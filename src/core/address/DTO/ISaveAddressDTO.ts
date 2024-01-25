export default interface ISaveAddressDTO {
  zip_code: string
  public_place: string
  complement: string | null
  district: string
  city: string
  number: string | null
  uf: string
}
