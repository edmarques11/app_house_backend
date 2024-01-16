export default interface IBucket {
  getUrlFile(fileHash: string, expiration: number): Promise<string>
}
