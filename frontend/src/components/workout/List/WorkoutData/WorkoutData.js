import React, {useState, useEffect, useContext} from 'react';
import { Table, Button, Modal} from 'antd';
import PropTypes from 'prop-types';
import WorkoutList from './WorkoutList/WorkoutList';
import axios from 'axios';
import { UserContext } from '../../../Users/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const WorkoutData = () => {
  const {user} = useContext(UserContext);
  
 
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutId, setWorkoutId] = useState();
 
  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      render: (_, __, index) => index + 1,
      width:'5%'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width:'10%'
    },
    {
      title: 'Workout',
      render:(_, data) => data.workoutType?.name ,
      key: 'workoutType',
      width:'25%'
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width:'25%'
    },
    {
      title: 'Edit',
      dataIndex: '_id',
      key: 'edit',
      render: (_id) => <Button onClick={()=> showModal(_id)} >Edit</Button>,
      width:'10%'
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'x',
      render: (_id) => <a onClick={()=> deleteWorkout(_id)}>Delete</a>,
      width:'10%'
    },
  ];

  const showModal = (id) => {
    setWorkoutId(id);
    setIsModalOpen(true);
    debugger
  };
  const handleOk = () => {
    const singleWorkout = workouts.find((workout)=> workout.id === workoutId);
    axios.put('http://localhost:5000/api/edit',{workoutId},{singleWorkout})
    .then((res) =>{
      debugger
      setIsModalOpen(false);
    })
    .catch((err)=>{
        console.log(err.message);
        setIsModalOpen(false);
    });

  };
  const handleCancel = () => {
    setWorkoutId();
    setIsModalOpen(false);
  };


  const editWorkout = (id) => { 
  }

  const deleteWorkout = (_id) => {
      axios.delete('http://localhost:5000/api/userWorkout',{
      params:{_id}
      })
      .then((res) => {
        const filteredWorkouts = workouts.filter((workout) => {
          return workout._id !== _id
        });
        setWorkouts([...filteredWorkouts]);
        alert(res.data);
      })
      .catch((err)=>{
        debugger
        console.log(err.message);
      })
  }
 

  useEffect(() => {
    if(!user){
      alert("Your session has expired. Please log in");
      navigate('/login');
    }
      // const workoutObj = {}
      axios.get('http://localhost:5000/api/me',{withCredentials:true})
      .then((res)=>{
        const $id = res.data._id;
        if($id){
          return axios.post('http://localhost:5000/api/user_workouts',{userId:$id})
        }
      }).then((workoutsRes)=>{
        if(workoutsRes){
          setWorkouts(workoutsRes.data);
        }
      })
      .catch((err)=>{
        console.log(err.message);
        alert('Your session has expired. Please log in')
        navigate('/login');
      })
  },[user, navigate])

  return (
    <div> 
      <h1>Fitness Calendar</h1>
      {/* Passing the callback function to WorkoutList as a prop */}
      {user ? 
        (<div>
          <Table className='calendarWorkouts'
          width="200"
          size="small"
          columns={columns}
          dataSource={workouts}
          />
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <label>Choose workout:</label><br/>
            <select>
            {workouts.map((workout, index) => (
              <option key={index} value={workout._id}>{workout.workout}</option>
              ))}
                </select>
              <div>
                <label>Duration(in hours)</label><br/>
                <input type="number" 
                required
                
                 />
              </div>
              <label>Date:</label><br/>
              <input required
                type="date" min={new Date().toISOString().split('T')[0]}
                />

            <p>Some contents...</p>
          </Modal>
        </div>) :
        (<p>Please log in to view your workout history</p>)
      }
    </div>
  );
};

WorkoutData.propTypes = {};

export default WorkoutData;
