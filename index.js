require('dotenv').config();
const fs = require('fs');
const csvParser = require('csv-parser');
const { DynamoDBClient, ScanCommand, BatchWriteItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const REGION = 'eu-west-1';
const tableName = process.env.TABLE_NAME;
const fileName = process.env.FILE_NAME;

const dbClient = new DynamoDBClient({ region: REGION });

async function deleteAllItemsFromDynamoDB() {
  const scanCommand = new ScanCommand({ TableName: tableName });
  const data = await dbClient.send(scanCommand);
  const items = data.Items.map(unmarshall);

  if (items.length === 0) {
    console.log('No items to delete.');
    return;
  }

  const requestItems = items.map(item => ({
    DeleteRequest: {
      Key: marshall({ Id: item.Id })
    }
  }));

  const batchWriteCommand = new BatchWriteItemCommand({
    RequestItems: { [tableName]: requestItems }
  });

  await dbClient.send(batchWriteCommand);
  console.log('All items deleted from the DynamoDB table.');
}

async function writeToDynamoDB(data) {
  const requestItems = data.map(item => ({
    PutRequest: {
      Item: marshall(item)
    }
  }));

  const batchWriteCommand = new BatchWriteItemCommand({
    RequestItems: { [tableName]: requestItems }
  });

  await dbClient.send(batchWriteCommand);
}

async function logCurrentItemsInTable() {
  const scanCommand = new ScanCommand({ TableName: tableName });
  const data = await dbClient.send(scanCommand);
  const items = data.Items.map(unmarshall);

  console.log('Current items in DynamoDB table:');
  items.forEach(item => console.log(item));
}

async function loadCSVDataToDynamoDB() {
  try {
    const results = await new Promise((resolve, reject) => {
      const data = [];
      fs.createReadStream(`data/routes_${fileName}.csv`)
        .pipe(csvParser())
        .on('data', row => data.push(row))
        .on('end', () => resolve(data))
        .on('error', err => reject(new Error(`Error reading CSV file: ${err.message}`)));
    });

    console.log(`Total records in CSV: ${results.length}`);
    console.log(`Items currently in table: ${tableName}:`);
    await logCurrentItemsInTable();
    await deleteAllItemsFromDynamoDB();
    await writeToDynamoDB(results);
    console.log('Data has been successfully loaded into DynamoDB.');
    await logCurrentItemsInTable();
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  deleteAllItemsFromDynamoDB,
  writeToDynamoDB,
  logCurrentItemsInTable,
  loadCSVDataToDynamoDB
};

// Call the function to start the data loading process
loadCSVDataToDynamoDB();
