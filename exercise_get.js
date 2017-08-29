import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {EXERCISE_TABLE_NAME} from "./constants";

export async function main(event, context, callback) {
    const params = {
        TableName: EXERCISE_TABLE_NAME,
        Key: {
            id: event.pathParameters.id,
        },
    };

    try {
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
        callback(null, failure({status: false}));
    }
};