import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {EXERCISE_TABLE_NAME} from "./constants";
import moment from "moment";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    console.info('data = ' + JSON.stringify(data));

    const params = {
        TableName: EXERCISE_TABLE_NAME,
        Item: {
            id: uuid.v1(),
            name: data.name,
            device: data.device,
            muskelgruppe: data.muskelgruppe,
            weight: data.weight,
            changedAt: moment().format('YYYY-DD-MM'),
            createdAt: moment().format('YYYY-DD-MM'),
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