import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {EXERCISE_TABLE_NAME, TRAINING_TABLE_NAME} from "./constants";
import moment from "moment";
import {createHistoryEntry} from "./exercise_history_create";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    console.info('data = ' + JSON.stringify(data));
    const now = moment().format('YYYY-DD-MM-HH-mm-ss');

    const params = {
        TableName: TRAINING_TABLE_NAME,
        // 'Key' defines the partition key and sort key of the item to be updated
        Key: {
            id: event.pathParameters.id,
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        // 'ExpressionAttributeNames' replaces the #... expressions with the real attribute names, which are reserved keywords in this case
        // https://stackoverflow.com/questions/36698945/scan-function-in-dynamodb-with-reserved-keyword-as-filterexpression-nodejs
        UpdateExpression: '#ex_name = :name, exercises = :exercises, changedAt = :changedAt, createdAt = :createdAt',
        ExpressionAttributeValues: {
            ':name': data.name ? data.name : 'training',
            'exercises': data.exercises,
            ':changedAt': now,
            ':createdAt': data.createdAt ? data.createdAt : now
        },
        ExpressionAttributeNames: {
            "#ex_name": "name"
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