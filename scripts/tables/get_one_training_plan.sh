#!/usr/bin/env bash
aws dynamodb query --table-name fit_training_plan --key-conditions file://data/get_fit_training_plan_key_conditions.json --endpoint-url http://localhost:8000