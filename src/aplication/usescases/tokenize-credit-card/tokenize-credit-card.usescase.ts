import {
  CreditCardEntity,
  TokenizedEntity,
} from "../../../domain/entities/credit-card.entity";
import CreditCardRepository from "../../../domain/repositories/credit-card.repository";
import { addMinutes } from "../../../utils/date";
import { luhnCheck } from "../../../utils/luhm-algorithm";
import { ramdon } from "../../../utils/token";
import { BadRequestError } from "../../service/custom-error";
import { TokenizeCreditCardRequest } from "./dto/tokenize-credit-card.request";

export class TokenizeCreditCardUseCase {
  constructor(private repository: CreditCardRepository) {}

  async execute(creditCardRequest: TokenizeCreditCardRequest): Promise<string> {
    const isValid = await luhnCheck(creditCardRequest.card_number.toString());
    if (!isValid)
      throw new BadRequestError(
        "No cumple con los requisitos minimos para el numero de tarjeta de credito"
      );

    const token = ramdon();
    const { identifier, ...creditCard } = creditCardRequest;
    const expirationDate = addMinutes(new Date(), 15);
    const tokenized: TokenizedEntity = {
      token,
      identifier,
      expiration_date: expirationDate.toString(),
      credit_card: creditCard,
    };

    await this.repository.save(tokenized);
    return token;
  }
}
