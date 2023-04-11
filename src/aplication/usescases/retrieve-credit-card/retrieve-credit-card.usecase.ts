import { TokenizedEntity } from "../../../domain/entities/credit-card.entity";
import CreditCardRepository from "../../../domain/repositories/credit-card.repository";
import { BadRequestError, NotFoundError } from "../../service/custom-error";
import { CreditCardResponse } from "./dto/credit-card.response";

export class RetrieveCreditCardUseCase {
  constructor(private repository: CreditCardRepository) {}

  async execute(token: string): Promise<CreditCardResponse | undefined> {
    const tokenizedEntity: TokenizedEntity = await this.repository.getById(
      token
    );

    if (!tokenizedEntity) throw new NotFoundError("El token no existe");

    const expirationDate = new Date(tokenizedEntity.expiration_date);
    if (expirationDate < new Date())
      throw new BadRequestError("El token ha expirado");

    return tokenizedEntity.credit_card;
  }
}
