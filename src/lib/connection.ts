import dynamoose from "dynamoose";
import * as AWS from "@aws-sdk/client-dynamodb";

declare global {
  // eslint-disable-next-line no-var
  var dynamooseClient: typeof dynamoose | undefined;
}

if (!global.dynamooseClient) {
  try {
    dynamoose.aws.ddb.set(
      new AWS.DynamoDB({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      })
    );
    global.dynamooseClient = dynamoose;
  } catch (error) {
    console.error("Failed to initialize Dynamoose:", error);
    throw error;
  }
}

export default global.dynamooseClient;
