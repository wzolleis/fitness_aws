#!/usr/bin/env bash
serverless webpack invoke --function createExercise --path mocks/create_exercise-event.json
serverless webpack invoke --function updateExercise --path mocks/update_exercise-event.json
serverless webpack invoke --function listPlans --path mocks/list_plans-event.json