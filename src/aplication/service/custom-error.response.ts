import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "./custom-error";

export const handleErrors = (error: Error): APIGatewayProxyResult => {
  // console.error(error);
  if (error instanceof BadRequestError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  } else if (error instanceof UnauthorizedError) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  } else if (error instanceof NotFoundError) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  } else {
    // Maneja cualquier otro error
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.",
      }),
    };
  }
};
