import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Form, Input, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Users/UserContext/UserContext';

const Schedule = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [workout, setSelectedWorkout] = useState('');  // State to store the selected workout name
  const [workoutTypes, setWorkoutTypes] = useState([]);

  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const { setUser } = useContext(UserContext);
  useEffect(()=>{
    axios.get('http://localhost:5000/api/me',{withCredentials:true})
    .then((res)=>{
        axios.get('http://localhost:5000/api/workoutType').then((res) =>{
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const workoutObj = {
      workoutType:workout,
      duration,
      date
    }
    // const dateObject = new Date(date).toISOString().split('T')[0];
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
          value={workout}
          onChange={(e) => setSelectedWorkout(e.target.value)}  // Update state when a workout is selected
        >
          <option value="">--Select Workout--</option> {/* Placeholder */}
          {workoutTypes?.map((workout, index) => (
            <option key={workout._id} value={workout._id}>{workout.name}</option>
          ))}
        </select>
        <div>
          <label>Duration(in hours)</label>
          <input type="number" 
          required
          value={duration}
          onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div>
          <label>Date</label>
          <input required
          type="date" min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit">submit</button>
    </form>
      {/* <Form
      form={form}
    >
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form> */}
      {/* <WorkoutData></WorkoutData> */}
    </div>
  );
}

Schedule.propTypes = {};


export default Schedule;
