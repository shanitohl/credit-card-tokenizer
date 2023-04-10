import { TokenizedEntity } from "../../../domain/entities/credit-card.entity";
import CreditCardRepository from "../../../domain/repositories/credit-card.repository";
import { CreditCardResponse } from "./dto/credit-card.response";

export class RetrieveCreditCardUseCase {
  constructor(private repository: CreditCardRepository) {}

  async execute(token: string): Promise<CreditCardResponse> {
    const tokenizedEntity: TokenizedEntity = await this.repository.getById(
      token
    );

    const expirationDate = new Date(tokenizedEntity.expiration_date);
    if (expirationDate < new Date()) throw new Error("El token is expired");

    return tokenizedEntity.credit_card;
  }
}
