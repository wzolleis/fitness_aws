import {EXERCISE_HISTORY_TABLE_NAME} from "./constants";
import moment from "moment";

export function createHistoryEntry(data) {
    console.info('history create entry with data = ' + JSON.stringify(data));
    const now = moment().format('YYYY-DD-MM-HH-mm-ss');

    return {
        TableName: EXERCISE_HISTORY_TABLE_NAME,
        Item: {
            id: data.id,
            createdAt: now,
            weight: data.weight,
            name: data.name
        },
    };
}