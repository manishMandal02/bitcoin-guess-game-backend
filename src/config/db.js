const AWS = require('aws-sdk');
const dotenv = require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  },
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const DB_NAME = 'bitcoin-price-predict-players';

module.exports = { dynamoClient, DB_NAME };
