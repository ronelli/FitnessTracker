import Workout from '../models/workoutModel.js';

const setWorkout = async (req, res) => {
    try {
        const workoutData = req.body; 
        workoutData.userId = req.userId;
        const newWorkout = new Workout(workoutData);
        await newWorkout.save();
        res.status(200).json('Your workout was successfully recorded')
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const getWorkout = async (req, res) => {
    try {
        const date = req.query.date;
        const userId = req.userId; //cookie value
        const queryDate = new Date(date);
        const existingWorkout = await Workout.findOne({ 
            date:queryDate,
            userId: req.userId,
        });
        if(!existingWorkout){
            res.status(200).json({exists: false, message:"No workout found on this day."})
        }
        else{
            res.status(200).json({exists: true, message:"Workout already scheduled on this day."})
        }
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({});
        res.status(200).json(workouts);
    }   
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const getUserWorkouts = async (req, res) => {
    try {
        const {userId} = req.body; //Destructure req.body object
        const workouts = await Workout.find({ userId }).sort({ date: -1 });
        res.status(200).json(workouts);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const getLastWorkout = async( req, res) => {
    try {
        const {userId} = req.body;
        const now = new Date();
        const lastWorkout = await Workout.findOne({
            userId,
            date: {$lt:now},
        }).sort({date:-1})
        if(!lastWorkout){
            return res.status(404).json({error: "No past workouts found for this user"});
        }
        res.status(200).json(lastWorkout);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const deleteWorkouts = async (req, res) => {
    try {
        await Workout.deleteMany({});
        res.status(200).json('data was succesfully deleted')
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

export default {setWorkout, getWorkout, getWorkouts, getUserWorkouts, deleteWorkouts, getLastWorkout};