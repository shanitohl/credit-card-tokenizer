import { middyfy } from "../adapters/lambda";
import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "../adapters/api-gateway";
import creditCardSchema from "./schemas/credit-card.schema";

import {
  TokenizeCreditCardRequest,
  TokenizeCreditCardResponse,
  TokenizeCreditCardUseCase,
} from "../aplication/usescases/tokenize-credit-card";
import DynamoDbCreditCard from "../infraestructure/repositories/dynamodb-credit-car.repository";
import { validateSchema } from "../aplication/service/credit-card.validator";

const tokenizeCreditCardController: ValidatedEventAPIGatewayProxyEvent<
  typeof creditCardSchema
> = async (event) => {
  const identifier = event.headers.Authorization.split(" ")[1];
  const body: TokenizeCreditCardRequest = { identifier, ...event.body };
  const result = validateSchema<TokenizeCreditCardRequest>(
    creditCardSchema,
    body
  );
  if (!result.isValid) {
    // Manejar el error de validación
    console.log(result.errors);
    return undefined;
  }

  const useCase = new TokenizeCreditCardUseCase(new DynamoDbCreditCard());
  const token: string = await useCase.execute(body);
  const response: TokenizeCreditCardResponse = { token };

  return formatJSONResponse({
    ...response,
  });
};

export const handler = middyfy(tokenizeCreditCardController);
