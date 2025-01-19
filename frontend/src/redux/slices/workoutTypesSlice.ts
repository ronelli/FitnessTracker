import {createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {WorkoutTypes} from '../../types/WorkoutType';

interface WorkoutTypesState {
    data: WorkoutTypes[];
    loading: boolean;
}

const initialState: WorkoutTypesState = {
    data: [],
    loading: false
};

export const fetchWorkoutType = createAsyncThunk('workoutTypes/fetchWorkoutTypes',
    async () => {
        const response = await axios.get<WorkoutTypes[]>('http://localhost:5000/api/workoutTypes');
        return response.data;
    }
)

const workoutTypesSlice = createSlice({
    name:'workoutTypes',
    initialState,
    reducers: {}
});

export default workoutTypesSlice.reducer;