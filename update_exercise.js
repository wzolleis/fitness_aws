import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {EXERCISE_TABLE_NAME} from "./constants";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: EXERCISE_TABLE_NAME,
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            id: event.pathParameters.id,
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: 'SET content = :content',
        ExpressionAttributeValues: {
            ':content': data.content ? data.content : null,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await dynamoDbLib.call('update', params);
        callback(null, success({status: true}));
    }
    catch (e) {
        callback(null, failure({status: false}));
    }
}