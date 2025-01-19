import React, { FC } from 'react';
import WorkoutHistory from '../WorkoutHistory/WorkoutHistory';
import { Workout } from '../../../types/Workout';
import axios, {AxiosResponse} from '../../../../node_modules/axios/index';
import { User } from '../../../types/User';

interface ManualWorkoutProps {
    workout: Workout;
}

const ManualWorkout: React.FC = () => {
    
    return (
        <div>
            <h2>Add Manual Workout</h2>
            <form>
            <select
          required
          // Update state when a workout is selected
        >
          <option value="">--Select Workout--</option> {/* Placeholder */}
        </select>
        <div>
          <label>Duration(in hours)</label>
          <input type="number" 
          required
          />
        </div>
        <div>
            <label>Date</label>
            <input required
            type="date" max={new Date().toISOString().split('T')[0]}
            />
        </div>
        <button type="submit">submit</button>
            </form>
        </div>
    );
}

export default ManualWorkout;