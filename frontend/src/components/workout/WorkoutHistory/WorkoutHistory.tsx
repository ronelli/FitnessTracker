import React, {FC} from "react";
import { Workout } from "../../../types/Workout";

interface WorkoutHistoryProps {
    workouts: Workout[];
}

const WorkoutHistory: FC<WorkoutHistoryProps> = ({ workouts }) => {
    return (
        <div>
            <h2>Workout History</h2>
            {workouts.length === 0 ? (
          <p>No workout history found.</p>
          ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Workout Type</th>
                <th>Date</th>
                <th>Duration (mins)</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout._id}>
                  <td>{index + 1}</td>
                  <td>{workout.workoutType.name}</td>
                  <td>{new Date(workout.date).toLocaleDateString()}</td>
                  <td>{workout.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
    );
};
export default WorkoutHistory;