#!/usr/bin/env bash
serverless webpack invoke --function createExercise --path mocks/create_exercise-event.json
serverless webpack invoke --function updateExercise --path mocks/update_exercise-event.json
serverless webpack invoke --function listPlans --path mocks/list_plans-event.json
serverless webpack invoke --function createPlan --path mocks/create_plan-event.json
serverless webpack invoke --function getPlan --path mocks/get_plan-event.json
serverless webpack invoke --function listExercises --path mocks/list_plans-event.json
serverless webpack invoke --function updatePlan --path mocks/update_plan-event.json
serverless webpack invoke --function createTraining --path mocks/create_training-event.json
serverless webpack invoke --function listTrainings --path mocks/list_trainings-event.json
serverless webpack invoke --function updateTraining --path mocks/update_training-event.json
