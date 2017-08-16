import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {EXERCISE_TABLE_NAME} from "./constants";

export async function main(event, context, callback) {
    const params = {
        TableName: EXERCISE_TABLE_NAME,
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'id': path parameter
        Key: {
            id: event.pathParameters.id,
        },
    };

    try {
        const result = await dynamoDbLib.call('delete', params);
        callback(null, success({status: true}));
    }
    catch (e) {
        callback(null, failure({status: false}));
    }
};