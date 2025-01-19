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
    'duration':{type: Number, required: true, min: 0},
    'calories':{type: Number, required: false},
    'date': {type:Date, required: true},
    'isCompleted': {type: Boolean, default: false},
    'rate': {
        type:Number,
        required: false,
        min: 1,
        max: 5
    },
    'intensity': {
        type: String,
        enum: ['low','medium','high'],
        required: false
    },
    'notes': {
        type: String,
        required: false,
        maxlength: 500
    }
},{ versionKey: false, timestamps: true});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;