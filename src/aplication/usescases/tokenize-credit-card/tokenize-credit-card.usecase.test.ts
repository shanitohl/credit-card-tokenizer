import { TokenizeCreditCardRequest } from "./dto/tokenize-credit-card.request";
import { TokenizeCreditCardUseCase } from "./tokenize-credit-card.usescase";

describe("TokenizeCreditCardUseCase", () => {
  let useCase: any;
  let creditCardRepository: any;

  beforeEach(() => {
    creditCardRepository = {
      getById: jest.fn(),
      save: jest.fn(),
    };
    useCase = new TokenizeCreditCardUseCase(creditCardRepository);
  });

  test("should save an entity", async () => {
    const token = "Nd8StBTQdQW3ySA1";
    const entity: Partial<TokenizeCreditCardRequest> = {
      email: "shanohl.sist@gmail.com",
      card_number: 4111111111111111,
      cvv: 1234,
      expiration_year: "2023",
      expiration_month: "12",
    };

    // creditCardRepository.save.mockResolvedValue(entity);
    const result = await useCase.execute(entity);
    expect(typeof result).toBe("string");
  });
});
