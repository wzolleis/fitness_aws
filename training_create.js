import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {PLAN_TABLE_NAME, TRAINING_TABLE_NAME} from "./constants";
import moment from 'moment';

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    console.log('data = ' + JSON.stringify(data));
    const params = {
        TableName: TRAINING_TABLE_NAME,
        Item: {
            id: uuid.v1(),
            name: data.name,
            createdAt: moment().format("YYYY-MM-DD"),
            exercises: data.exercises
        },
    };
    console.log('params = ' + JSON.stringify(params));

    try {
        const result = await dynamoDbLib.call('put', params);
        callback(null, success(params.Item));
    }
    catch (e) {
        console.error(e);
        callback(null, failure({status: false}));
    }
};