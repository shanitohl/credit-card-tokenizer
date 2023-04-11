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
import { handleErrors } from "../aplication/service/custom-error.response";

const retrieveCreditCardController: ValidatedEventAPIGatewayProxyEvent<
  typeof tokenSchema
> = async (event) => {
  try {
    const { token } = event.queryStringParameters;
    const result = validateSchema<CreditCardRequest>(tokenSchema, { token });
    if (!result.isValid) {
      return formatJSONResponse({
        status: 400,
        message: result.errors.map((a) => {
          return { field: a.schemaPath, message: a.message };
        }),
      });
    }

    const useCase = new RetrieveCreditCardUseCase(new DynamoDbCreditCard());
    const creditCard: CreditCardResponse = await useCase.execute(token);
    return formatJSONResponse({
      ...creditCard,
    });
  } catch (error) {
    return handleErrors(error);
  }
};

export const handler = middyfy(retrieveCreditCardController);
