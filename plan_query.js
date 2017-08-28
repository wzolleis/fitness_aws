import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {EXERCISE_TABLE_NAME, PLAN_TABLE_NAME} from "./constants";

export async function main(event, context, callback) {
    console.log(JSON.stringify(event));

    const createdAt = event.pathParameters.createdAt;

    const params = {
        TableName: PLAN_TABLE_NAME,
        KeyConditionExpression: 'createdAt > :createdAtValue',
        ExpressionAttributeValues: {
            ':createdAtValue': createdAt
        }
    };

    try {
        console.info('parameter = ' + JSON.stringify(params));
        const result = await dynamoDbLib.call('query', params);
        if (result.Item) {
            // Return the retrieved item
            callback(null, success(result.Item));
        }
        else {
            callback(null, failure({status: false, error: 'Item not found.'}));
        }
    }
    catch (e) {
        console.error(JSON.stringify(e));
        callback(null, failure({status: false, msg: e.message}));
    }
}