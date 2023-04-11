import dynamoDBClient from "../../adapters/dynamodb";
import { TokenizedEntity } from "../../domain/entities/credit-card.entity";
import CreditCardRepository from "../../domain/repositories/credit-card.repository";

export default class DynamoDbCreditCard implements CreditCardRepository {
  // private tableName: string = process.env.CREDIT_TABLE_TABLE ?? "credit-card-table"; //creditCardTable;

  constructor(private readonly tableName: string = process.env.CREDIT_TABLE_TABLE) {}

  private docClient = dynamoDBClient();

  async save(entity: TokenizedEntity): Promise<TokenizedEntity> {
    console.log("after create dynamobcliente", entity);
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: entity,
      })
      .promise();
    return entity;
  }

  async getById(id: string): Promise<TokenizedEntity | undefined> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: {
          token: id,
        },
      })
      .promise();
    if (!result.Item) {
      return undefined; // throw new Error("Id does not exit");
    }
    return result.Item as TokenizedEntity;
  }
}
