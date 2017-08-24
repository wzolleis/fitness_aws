import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';
import {PLAN_TABLE_NAME} from "./constants";

export async function main(event, context, callback) {
    const params = {
        TableName: PLAN_TABLE_NAME,
    };

    try {
        const result = await dynamoDbLib.call('scan', params);
        // Return the matching list of items in response body
        callback(null, success(result.Items));
    }
    catch (e) {
        console.log(e);
        callback(null, failure({status: false}));
    }
};