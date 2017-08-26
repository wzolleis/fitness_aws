#!/usr/bin/env bash
aws dynamodb put-item \
    --table-name fit_training_plan \
    --item file://data/fit_training_plan_item.json \
    --return-consumed-capacity TOTAL \
    --endpoint-url http://localhost:8000