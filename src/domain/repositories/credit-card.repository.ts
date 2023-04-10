import { TokenizedEntity } from "../entities/credit-card.entity";

export default interface CreditCardRepository {
  save(entity: TokenizedEntity): Promise<TokenizedEntity>;
  getById(id: string): Promise<TokenizedEntity>;
}