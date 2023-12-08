export default class ImmobileNotExists extends Error {
  constructor() {
    super("Imóvel não existe");
    this.name = "ImmobileNotExists";
  }

  public get message(): string {
    return super.message;
  }
}
