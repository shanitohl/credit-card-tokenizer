// import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "../adapters/api-gateway";

import { middyfy } from "../adapters/lambda";
import tokenSchema from "./schemas/token.schema";
import DynamoDbCreditCard from "../infraestructure/repositories/dynamodb-credit-car.repository";
import { RetrieveCreditCardUseCase } from "../aplication/usescases/retrieve-credit-card/retrieve-credit-card.usecase";
import { CreditCardResponse } from "../aplication/usescases/retrieve-credit-card/dto/credit-card.response";
import { validateSchema } from "../aplication/service/credit-card.validator";
import { CreditCardRequest } from "../aplication/usescases/retrieve-credit-card/dto/credit-card.request";

const retrieveCreditCardController: ValidatedEventAPIGatewayProxyEvent<
  typeof tokenSchema
> = async (event) => {
  const { token } = event.queryStringParameters;
  const result = validateSchema<CreditCardRequest>(tokenSchema, { token });
  if (!result.isValid) {
    console.log(result.errors);
    return undefined;
  }

  const useCase = new RetrieveCreditCardUseCase(new DynamoDbCreditCard());
  const creditCard: CreditCardResponse = await useCase.execute(token);
  return formatJSONResponse({
    ...creditCard,
  });
};

export const handler = middyfy(retrieveCreditCardController);
