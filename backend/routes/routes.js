// const express = require('express');
import express from 'express';
import userController from '../controllers/userController.js';
import workoutController from '../controllers/workoutController.js';
import workoutTypeController from '../controllers/workoutTypeController.js';
import authenticateToken from '../middleware/authToken.js';
const { createUser, getUsers, getUser,userLogout, deleteUsers,getUserFromToken } = userController;
const {getUserWorkouts, getWorkouts, setWorkout, getWorkout ,getLastWorkout, editWorkout, deleteWorkouts, deleteWorkout, getWorkoutHistory, getUserWorkoutHistory} = workoutController;
const {getWorkoutTypes, setWorkoutType, deleteWorkoutTypes} = workoutTypeController;
const router = express.Router();

//user routes
router.post('/users',createUser);
router.get('/users', getUsers);
router.delete('/users', deleteUsers);
router.post('/user',getUser);
router.get('/me',authenticateToken, getUserFromToken);
router.post('/logout', userLogout);

//workout routes
router.post('/workout', authenticateToken, setWorkout);
router.get('/user_workouts', getUserWorkouts)
router.post('/lastWorkout',getLastWorkout);
router.get('/getWorkout',authenticateToken,getWorkout); //checking if another workout scheduled on same date.
router.get('/workouts',getWorkouts);
router.put('/edit', editWorkout);
router.delete('/workouts',deleteWorkouts);
router.delete('/userWorkout',deleteWorkout);

//workout type routes
router.post('/workoutType',setWorkoutType);
router.get('/workoutTypes',getWorkoutTypes);
router.delete('/workoutType',deleteWorkoutTypes);


//workout history
router.get('/workout-history',getWorkoutHistory);
router.get('/user-history' ,getUserWorkoutHistory);

export default router;

