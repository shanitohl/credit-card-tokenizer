export default {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    card_number: {
      type: "number",
      minimum: 1000000000000,
      maximum: 9999999999999999,
      // exclusiveMinimum: 1,
      // exclusiveMaximum: 1,
    },
    cvv: {
      type: "number",
      minimum: 100,
      maximum: 9999,
      // exclusiveMinimum: 1,
      // exclusiveMaximum: 1,
    },
    expiration_year: { type: "string", minLength: 4, maxLength: 4 },
    expiration_month: { type: "string", minLength: 1, maxLength: 2 },
  },
  required: [
    "email",
    "card_number",
    "cvv",
    "expiration_year",
    "expiration_month",
  ],
} as const;
