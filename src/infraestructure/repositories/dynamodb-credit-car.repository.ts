import dynamoDBClient from "../../adapters/dynamodb";
import { TokenizedEntity } from "../../domain/entities/credit-card.entity";
import CreditCardRepository from "../../domain/repositories/credit-card.repository";

export default class DynamoDbCreditCard implements CreditCardRepository {
  private tableName: string = "credit-card-table"; //creditCardTable;
  private docClient = dynamoDBClient();

  constructor() {}

  async save(entity: TokenizedEntity): Promise<TokenizedEntity | undefined> {
    console.log("after create dynamobcliente", entity);
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: entity,
      })
      .promise();
    return entity as TokenizedEntity;
  }

  async getById(id: string): Promise<TokenizedEntity> {
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
