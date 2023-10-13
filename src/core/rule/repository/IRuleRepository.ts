import IRule from "../model/IRule";

export default interface IRuleRepository {
  findByName(name: string): Promise<IRule | null>;
}