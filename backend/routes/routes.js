// const express = require('express');
import express from 'express';
import userController from '../controllers/userController.js';
import workoutController from '../controllers/workoutController.js';
import authenticateToken from '../middleware/authToken.js';
const { createUser, getUsers, getUser, deleteUsers,getUserFromToken } = userController;
const {getUserWorkouts, getWorkouts, setWorkout, getWorkout ,getLastWorkout, deleteWorkouts} = workoutController;
const router = express.Router();

//user routes
router.post('/users',createUser);
router.get('/users', getUsers);
router.delete('/users', deleteUsers);
router.post('/user',getUser);
router.get('/me',authenticateToken, getUserFromToken);

//workout routes
router.post('/workout', authenticateToken, setWorkout);
router.post('/user_workouts',getUserWorkouts)
router.post('/lastWorkout',getLastWorkout);
router.get('/getWorkout',authenticateToken,getWorkout); //checking if another workout scheduled on same date.
router.get('/workouts',getWorkouts);
router.delete('/workouts',deleteWorkouts);

export default router;