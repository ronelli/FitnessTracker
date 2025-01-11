import mongoose from "mongoose";

const workoutTypeSchema = new mongoose.Schema({
    'name': {type: String, required: true },
    'category':{type: String, required: true},
},{ versionKey: false });

const WorkoutType = mongoose.model('WorkoutType', workoutTypeSchema);

export default WorkoutType;