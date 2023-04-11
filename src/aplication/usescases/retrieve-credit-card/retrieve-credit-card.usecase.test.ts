import { addMinutes } from "../../../utils/date";
import { RetrieveCreditCardUseCase } from "./retrieve-credit-card.usecase";

describe("RetrieveCreditCardUseCase", () => {
  let useCase: any;
  let creditCardRepository: any;

  beforeEach(() => {
    creditCardRepository = {
      getById: jest.fn(),
      save: jest.fn(),
    };
    useCase = new RetrieveCreditCardUseCase(creditCardRepository);
  });

  test("should get an entity by id", async () => {
    const token = "Nd8StBTQdQW3ySA1";
    const expirationDate = addMinutes(new Date(), 15);
    const entity: any = {
      token,
      identify: "weqweqweqwe",
      expiration_date: expirationDate.toString(),
      credit_card: {
        email: "shanohl.sist@gmail.com",
        card_number: 4111111111111111,
        cvv: 1234,
        expiration_year: "2023",
        expiration_month: "12",
      },
    };
    creditCardRepository.getById.mockResolvedValue(entity);
    const result = await useCase.execute(token);
    expect(result).toEqual(entity.credit_card);
  });
});
