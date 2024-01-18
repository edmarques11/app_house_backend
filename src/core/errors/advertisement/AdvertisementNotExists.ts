export default class AdvertisementNotExists extends Error {
  constructor() {
    super("Anúncio não existe");
    this.name = "AdvertisementNotExists";
  }

  public get message(): string {
    return super.message;
  }
}
