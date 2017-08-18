import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {EXERCISE_TABLE_NAME} from "./constants";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: EXERCISE_TABLE_NAME,
        // 'Key' defines the partition key and sort key of the item to be updated
        Key: {
            id: event.pathParameters.id,
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ':content': data.content ? data.content : null,
            ':attachment': data.attachment ? data.attachment : null,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await dynamoDbLib.call('update', params);
        callback(null, success({status: true}));
    }
    catch (e) {
        console.error(e);
        callback(null, failure({status: false}));
    }
}