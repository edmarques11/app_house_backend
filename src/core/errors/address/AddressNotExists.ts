export default class AddressNotExists extends Error {
  constructor() {
    super("Endereço não cadastrado");
    this.name = "AddressNotExists";
  }

  public get message(): string {
    return super.message;
  }
}
