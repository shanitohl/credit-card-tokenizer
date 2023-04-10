export interface TokenizeCreditCardRequest {
  identifier: string;
  email: string;
  card_number: number;
  cvv: number;
  expiration_year: string;
  expiration_month: string;
}
