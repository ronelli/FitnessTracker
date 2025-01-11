import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    'userId':{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    'workoutType': {
        type: mongoose.Schema.Types.ObjectId,
        ref:'WorkoutType',
        required:true
    },
    'duration':{type: Number, required: true},
    'calories':{type: Number, required: false},
    'date': {type:Date, default: Date.now()}
},{ versionKey: false });

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;