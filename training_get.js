import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {EXERCISE_TABLE_NAME, PLAN_TABLE_NAME, TRAINING_TABLE_NAME} from "./constants";

export async function main(event, context, callback) {
    console.log(JSON.stringify(event));

    const params = {
        TableName: TRAINING_TABLE_NAME,
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'id': path parameter
        Key: {
            id: event.pathParameters.id,
            createdAt: event.pathParameters.createdAt
        },
    };

    try {
        console.info('parameter = ' + JSON.stringify(params));
        const result = await dynamoDbLib.call('get', params);
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