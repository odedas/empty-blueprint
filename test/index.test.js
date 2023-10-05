const fs = require('fs');
const csvParser = require('csv-parser');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const { deleteAllItemsFromDynamoDB, writeToDynamoDB, logCurrentItemsInTable, loadCSVDataToDynamoDB } = require('../index'); // Replace with the correct path to your code

jest.mock('fs');
jest.mock('csv-parser');
jest.mock('@aws-sdk/client-dynamodb');

describe('loadCSVDataToDynamoDB', () => {
  it('should load CSV data into DynamoDB', async () => {
    // Mocking fs.createReadStream to simulate reading a CSV file
    const mockReadStream = jest.fn();
    fs.createReadStream.mockReturnValue(mockReadStream);

    // Mocking DynamoDBClient to simulate database operations
    const mockDbClient = new DynamoDBClient();
    DynamoDBClient.mockImplementation(() => mockDbClient);

    // Sample CSV data for testing
    const csvData = [
      { Id: 1, Name: 'Item 1' },
      { Id: 2, Name: 'Item 2' }
    ];

    // Mocking CSV file read stream events
    const mockCsvParser = csvParser();
    csvParser.mockReturnValue(mockCsvParser);
    mockReadStream.pipe.mockReturnValue(mockCsvParser);

    // Mocking DynamoDB scan response (empty table)
    mockDbClient.send.mockResolvedValueOnce({ Items: [] });

    // Mocking DynamoDB delete and write operations
    mockDbClient.send.mockResolvedValueOnce({});
    mockDbClient.send.mockResolvedValueOnce({});

    // Running the function
    await loadCSVDataToDynamoDB();

    // Assertions
    expect(fs.createReadStream).toHaveBeenCalledWith('data/routes_yourFileName.csv');
    expect(csvParser).toHaveBeenCalled();
    expect(mockDbClient.send).toHaveBeenCalledWith(expect.anything());
    expect(mockDbClient.send).toHaveBeenCalledWith(expect.anything());
    expect(mockDbClient.send).toHaveBeenCalledWith(expect.anything());
  });
});
