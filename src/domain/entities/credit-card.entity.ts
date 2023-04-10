export class CreditCardEntity {
  email: string;
  card_number: number;
  cvv: number;
  expiration_year: string;
  expiration_month: string;
}

export class TokenizedEntity {
  token: string;
  identifier: string;
  expiration_date: string;
  credit_card: CreditCardEntity;
}
