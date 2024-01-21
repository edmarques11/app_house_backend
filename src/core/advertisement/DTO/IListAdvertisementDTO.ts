export default interface IListAdvertisementDTO {
  page: number
  itemsPerPage: number
  toOwner?: "0" | "1"
  ownerId?: string
  location?: string
}
