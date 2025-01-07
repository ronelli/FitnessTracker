import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const WorkoutList = ({ onCountUpdate, selectedWorkout  }) => {


  const [workouts, setWorkouts] = useState([]);

  // Whenever the workouts array changes, update the parent component with the new count
  useEffect(() => {
    onCountUpdate(workouts.length);
  }, [workouts]); // 'workouts' is a dependency, so this effect runs whenever workouts change

  const addWorkout = () => {
    const newWorkout = { id: workouts.length + 1, name: `Workout ${workouts.length + 1}` };
    setWorkouts([...workouts, newWorkout]);  // This triggers a re-render and an update to the total count
  };
  return (
    <div>
      <ul>
        {workouts.map(workout => (
          <li key={workout.id}>{workout.name}</li>
        ))}
      </ul>
      <button onClick={addWorkout}>Add Workout</button>
    </div>
  );
};

WorkoutList.propTypes = {};


export default WorkoutList;
