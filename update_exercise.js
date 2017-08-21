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
        // 'ExpressionAttributeNames' replaces the #... expressions with the real attribute names, which are reserved keywords in this case
        // https://stackoverflow.com/questions/36698945/scan-function-in-dynamodb-with-reserved-keyword-as-filterexpression-nodejs
        UpdateExpression: 'SET attachment = :attachment, #ex_name = :name, device = :device, muskelgruppe = :muskelgruppe, #ex_type =:type',
        ExpressionAttributeValues: {
            ':attachment': data.attachment ? data.attachment : null,
            ':name': data.name ? data.name : null,
            ':device': data.device ? data.device : null,
            ':muskelgruppe': data.muskelgruppe ? data.muskelgruppe : null,
            ':type': data.type ? data.type : null
        },
        ExpressionAttributeNames: {
            "#ex_name": "name",
            "#ex_type": "type"
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