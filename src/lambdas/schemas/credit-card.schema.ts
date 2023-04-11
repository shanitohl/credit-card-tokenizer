const MIN_CARD_NUMBER = "1000000000000";
const MAX_CARD_NUMBER = "9999999999999999";

export default {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    card_number: {
      type: "number",
      minimum: parseInt(MIN_CARD_NUMBER),
      maximum: parseInt(MAX_CARD_NUMBER),
    },
    cvv: {
      type: "number",
      minimum: parseInt("100"),
      maximum: parseInt("9999"),
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
