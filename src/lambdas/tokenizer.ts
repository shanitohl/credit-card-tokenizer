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
import { handleErrors } from "../aplication/service/custom-error.response";

const tokenizeCreditCardController: ValidatedEventAPIGatewayProxyEvent<
  typeof creditCardSchema
> = async (event) => {
  try {
    const identifier = event.headers.Authorization.split(" ")[1];
    const body: TokenizeCreditCardRequest = { identifier, ...event.body };
    const result = validateSchema<TokenizeCreditCardRequest>(
      creditCardSchema,
      body
    );
    if (!result.isValid) {
      return formatJSONResponse({
        status: 400,
        message: result.errors.map((a) => {
          return { field: a.schemaPath, message: a.message };
        }),
      });
    }

    const useCase = new TokenizeCreditCardUseCase(new DynamoDbCreditCard());
    const token: string = await useCase.execute(body);
    const response: TokenizeCreditCardResponse = { token };

    return formatJSONResponse({
      ...response,
    });
  } catch (error) {
    return handleErrors(error);
  }
};

export const handler = middyfy(tokenizeCreditCardController);
