import type IRule from "~/core/rule/model/IRule";

export default interface IRuleRepository {
  findByName(name: string): Promise<IRule | null>
}
