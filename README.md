# Tokenizer credit card

### Using NPM

Install npm project dependencies

- Run `npm i` to install the project dependencies

Install dynamodb

- npm run dynamodb

### Using Serveless

Install plugins aws offline

- serverless plugin install -n serverless-offline
- serverless plugin install -n serverless-dynamodb-local
- serverless plugin install -n serverless-plugin-typescript

### Manage app

Run app

- npm run start

Run test

- npm run test

Deploy app

- npm run deploy:dev

Remove Deploy

- npm run remove:dev

### Test api

- Tokenizer credit card test
  POST: http://localhost:3000/dev/tokens
    body: {
      "email": "shanohl.sist@gmail.com",
      "card_number": 4111111111111111,
      "cvv": 1234,
      "expiration_year": "2023",
      "expiration_month": "12"
  }

- Retrieve credit card details
  GET: http://localhost:3000/dev/token?token=8qpfhSQGIqzOZwXl

### Fix compoment

https://s3.us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz
