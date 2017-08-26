#!/usr/bin/env bash
aws dynamodb scan --table-name fit_training_plan \
--filter-expression 'active = :a' \
 --expression-attribute-values '{ ":a": {"BOOL": true}}'\
  --endpoint-url http://localhost:8000