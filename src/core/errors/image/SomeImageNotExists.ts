export default class SomeImageNotExists extends Error {
  constructor() {
    super("Alguma imagem não existe");
    this.name = "SomeImageNotExists";
  }

  public get message(): string {
    return super.message;
  }
}
