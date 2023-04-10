// import Ajv from "ajv";
// import addFormats from "ajv-formats";

// export const validateSchema = (schema: any, dto: any): boolean => {
//   const ajv = new Ajv({ allErrors: true });
//   // console.log(schema);
//   addFormats(ajv);
//   // console.log("Holaaaaa....");
//   const validate = ajv.compile(schema);
//   console.log(dto);

//   try {
//     const isValid = validate(dto);
//     console.log(isValid, `Validation Error: ${ajv.errorsText()}`);
//     return isValid;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

import Ajv from "ajv";
import { Schema } from "ajv";
import { ValidateFunction } from "ajv";
import { ErrorObject } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

export const validateSchema = <T>(
  schema: Schema,
  data: T
): { isValid: boolean; errors?: ErrorObject[] } => {
  const validate: ValidateFunction = ajv.compile(schema);
  const isValid = validate(data) as boolean;

  if (isValid) {
    return { isValid };
  }

  const errors = validate.errors;

  return { isValid, errors };
};
