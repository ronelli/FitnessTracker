import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Form, Input, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Users/UserContext/UserContext';
import { WorkoutTypes } from '../../../types/WorkoutType';


interface workoutValues {
  workoutType: WorkoutTypes;
  duration: number;
  date: string;
}

const Schedule: React.FC = () =>{
  
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [workout, setSelectedWorkout] = useState<WorkoutTypes | null>(null);  // State to store the selected workout name
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutTypes[]>([]);
  const [duration, setDuration] = useState<number | ''>('');
  const [date, setDate] = useState<string>('');

  const { setUser } = useContext(UserContext);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/me',{withCredentials:true})
    .then((res)=>{
        axios.get('http://localhost:5000/api/workoutTypes').then((res) =>{
          setWorkoutTypes(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    })
    .catch((err)=>{
        setUser(null);
      alert('Please log in again');
      navigate('/login');
    })
  },[navigate])

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debugger
    if (!workout || !duration || !date) {
      return alert("All fields are required!");
    }
    const workoutObj:workoutValues = {
      workoutType:workout,
      duration:Number(duration),
      date
    }
    axios.get('http://localhost:5000/api/getWorkout', {
      params: { date }, // Only send the date as a query parameter
      withCredentials: true, // Include the cookie for authentication
    }).then((res)=>{
      if(res.data.exists){
        return alert(res.data.message);
      }
      else {
        axios.post('http://localhost:5000/api/workout',workoutObj, {
          headers: {
          'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        .then((res)=>{
          console.log(res);
          alert('Your workout was successfully recorded');
          navigate('/list')
          
        }).catch((err)=>{
          console.log(err.message);
        })
      }
    }).catch((err)=>{
      console.log(err.message);
    })
  }
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>Choose workout:</label><br/>
      <select
          required
          value={workout?.id}
          onChange={(e) => {
            const selectedWorkout = workoutTypes.find((w) => w.name === e.target.value);
            setSelectedWorkout(selectedWorkout || null)}  // Update state when a workout is selected
          } 
            
        >
          <option value="">--Select Workout--</option> {/* Placeholder */}
          {workoutTypes?.map((workout, index) => (
            <option key={workout.id} value={workout.id}>{workout.name}</option>
          ))}
        </select>
        <div>
          <label>Duration(in hours)</label>
          <input type="number" 
          required
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))} />
        </div>
        <div>
          <label>Date</label>
          <input required
          type="date" min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit">submit</button>
    </form>
    </div>
  );
}

export default Schedule;
