import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import WorkoutList from './WorkoutList/WorkoutList';
import axios from 'axios';
import { UserContext } from '../../../Users/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const WorkoutData = () => {
 

  const {user} = useContext(UserContext);
 
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
      // const workoutObj = {}
      axios.get('http://localhost:5000/api/me',{withCredentials:true})
      .then((res)=>{
        debugger
        console.log(res);
        const $id = res.data._id;
        if($id){
          return axios.post('http://localhost:5000/api/user_workouts',{userId:$id})
        }
      }).then((workoutsRes)=>{
        setWorkouts(workoutsRes.data);
      })
      .catch((err)=>{
        console.log(err.message);
        alert('Your session has expired. Please log in')
        navigate('/login');
      })
  },[navigate])

  return (
    <div>
      <h1>Fitness Calendar</h1>
      {/* Passing the callback function to WorkoutList as a prop */}
      {user ? 
      (<div>
        <table>
          <caption>Calendar</caption>
          <thead>
            <tr>
              <th>Number</th>
              <th>Date</th>
              <th>Workout type</th>
              <th>Duration</th>
            </tr>
          </thead>    

          <tbody>
            {workouts?.map((workout,index) => (
              <tr>
                <td>{++index}</td>
                <td>{workout.date}</td>
                <td>{workout.workout}</td>
                <td>{workout.duration}</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>) :
      (<p>Please log in to view your workout history</p>)
      }
    </div>
  );
};

WorkoutData.propTypes = {};

export default WorkoutData;
