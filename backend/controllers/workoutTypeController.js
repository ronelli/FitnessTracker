import WorkoutType from '../models/workoutTypeModel.js';

const setWorkoutType = async (req, res) => {
    try {
        const workoutData= req.body;
        console.log(workoutData);
        const newWorkoutType = new WorkoutType(workoutData);
        await newWorkoutType.save();
        res.status(201).send('Workout type added');
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}

const getWorkoutTypes = async(req, res) =>{
    try {
        const workoutTypes = await WorkoutType.find({});
        res.status(200).json(workoutTypes);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}

const deleteWorkoutTypes = async (req, res) => {
    try {
        await WorkoutType.deleteMany({});
        res.status(200).json('workout types was succesfully deleted')
    }   
    catch(err){
        res.status(400).json({error: err.message})
    }
}

export default {setWorkoutType, getWorkoutTypes, deleteWorkoutTypes}