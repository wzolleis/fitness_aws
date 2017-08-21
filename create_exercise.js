import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {EXERCISE_TABLE_NAME} from "./constants";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: EXERCISE_TABLE_NAME,
        Item: {
            // userId: event.requestContext.identity.cognitoIdentityId,
            id: uuid.v1(),
            name: data.name,
            device: data.device,
            muskelgruppe: data.muskelgruppe,
            attachment: data.attachment,
            type: data.type
            // createdAt: new Date().getTime(),
        },
    };

    try {
        const result = await dynamoDbLib.call('put', params);
        callback(null, success(params.Item));
    }
    catch (e) {
        callback(null, failure({status: false}));
    }
};