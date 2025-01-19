import { configureStore } from '@reduxjs/toolkit';
import workoutTypesReducer from './slices/workoutTypesSlice';

const store =configureStore({
    reducer: {
        workoutTypes: workoutTypesReducer
    }
})