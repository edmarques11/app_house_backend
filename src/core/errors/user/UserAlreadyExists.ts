export default class UserAlreadyExists extends Error {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExists";
  }

  public get message(): string {
    return super.message;
  }
}
