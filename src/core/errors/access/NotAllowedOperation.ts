export default class NotAllowedOperation extends Error {
  constructor() {
    super("Operação não permitida");
    this.name = "NotAllowedOperation";
  }

  public get message(): string {
    return super.message;
  }
}
