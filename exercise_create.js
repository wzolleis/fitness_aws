import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {EXERCISE_TABLE_NAME} from "./constants";
import moment from "moment";
import {createHistoryEntry} from "./exercise_history_create";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    console.info('data = ' + JSON.stringify(data));

    const id = uuid.v1();
    const now = moment().format('YYYY-DD-MM-HH-mm-ss');

    const params = {
        TableName: EXERCISE_TABLE_NAME,
        Item: {
            id: id,
            name: data.name,
            device: data.device,
            muskelgruppe: data.muskelgruppe,
            weight: data.weight,
            changedAt: now,
            createdAt: now,
        },
    };

    try {
        const historyData = {id: params.Item.id, weight: data.weight, name: data.name};
        const history = createHistoryEntry(historyData);
        await dynamoDbLib.call('put', history);
        await dynamoDbLib.call('put', params);
        callback(null, success(params.Item));
    }
    catch (e) {
        callback(null, failure({status: false, message: e.message}));
    }
};