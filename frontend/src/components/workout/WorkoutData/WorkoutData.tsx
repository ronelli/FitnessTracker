import React, {useState, useEffect, useContext} from 'react';
import { Table, Button, Modal} from 'antd';
import axios from 'axios';
import { UserContext } from '../../Users/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { WorkoutTypes } from '../../../types/WorkoutType';
import { Workout }  from '../../../types/Workout';


const WorkoutData: React.FC = () =>{
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  
 
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutTypes[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutId, setWorkoutId] = useState<string>('');
  const [newDate, setNewDate] = useState('');
  const [newDuration, setNewDuration] = useState<number | undefined>(undefined);
  const [newWorkoutType, setNewWorkoutType] = useState('');
 
  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      render: (_:any, __:any, index:number) => index + 1,
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
      render:(_:any, data:any) => data.workoutType?.name ,
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
      render: (_id: string) => <Button onClick={()=> showModal(_id)} >Edit</Button>,
      width:'10%'
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'x',
      render: (_id:string) => <a onClick={()=> deleteWorkout(_id)}>Delete</a>,
      width:'10%'
    },
  ];

  const showModal = (id:string) => {
    setWorkoutId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const singleWorkout = workouts.find((workout)=> workout._id === workoutId);
    if(!singleWorkout){
      return;
    }
    const newWorkout = setNewWorkout(singleWorkout);
    axios.put('http://localhost:5000/api/edit',newWorkout, { headers: { 'Content-Type': 'application/json' } })
    .then((res) =>{
      setWorkouts(workouts.map(w => w._id == newWorkout._id ? newWorkout : w ));
      setIsModalOpen(false);
    })
    .catch((err)=>{
      console.log(err.message);
      setIsModalOpen(false);
    });
    
  };
  const handleCancel = () => {
    setWorkoutId('');
    setIsModalOpen(false);
  };
  
  const setNewWorkout = (selectedWorkout:Workout) => {
    if(newDuration) {
      selectedWorkout.duration = newDuration;
    }
    if(newDate.length != 0) {
      selectedWorkout.date = newDate;
    }
    if(newWorkoutType.length != 0 && workoutTypes) {
      const selectedType = workoutTypes.find((w)=>w.name === newWorkoutType)
      if(selectedType){
        selectedWorkout.workoutType = selectedType;
      }
    }   
    return selectedWorkout;
  }

  const deleteWorkout = (_id: string) => {
      axios.delete('http://localhost:5000/api/userWorkout',{
      params:{_id}
      })
      .then((res) => {
        const filteredWorkouts = workouts.filter((workout) => {
          return workout?._id !== _id
        });
        setWorkouts([...filteredWorkouts]);
        alert(res.data);
      })
      .catch((err)=>{
        console.log(err.message);
      })
  }
 

  useEffect(() => {
      axios.get('http://localhost:5000/api/me',{withCredentials:true})
      .then((res)=>{
        const userId = res.data._id;
        if(userId){
          return axios.get(`http://localhost:5000/api/user_workouts?userId=${userId}`)
        }
      }).then((workoutsRes)=>{
        if(workoutsRes){
          setWorkouts(workoutsRes.data);
        }
      }).then((res) => {
        axios.get('http://localhost:5000/api/workoutTypes').then((res) =>{
          setWorkoutTypes(res.data);
        }).catch((err)=>{
          console.log(err.message);
        })
      })
      .catch((err)=>{
        console.log(err.message);
        alert('Your session has expired. Please log in')
        navigate('/login');
      })
  },[user])

  return (
    <div> 
      <h1>Fitness Calendar</h1>
      {/* Passing the callback function to WorkoutList as a prop */}
      {user ? 
        (<div>
          <Table className='calendarWorkouts'
          // width="200"
          size="small"
          columns={columns}
          dataSource={workouts}
          />
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <form>
              <label>Choose workout:</label><br/>
              <select value={newWorkoutType} onChange={(e)=> {
                const selectedType = workoutTypes.find((type) => type.name === e.target.value);
                if(selectedType){
                  setNewWorkoutType(selectedType.name);
                }
              }}>
                <option value="">--Select Workout--</option>
                {workoutTypes.map((type, index) => (
                  <option key={index} value={type.name}>{type.name}</option>
                  ))}
              </select>
                <div>
                  <label>Duration(in hours)</label><br/>
                  <input type="number" 
                  required
                  value={newDuration} onChange={(e)=>setNewDuration(Number(e.target.value))}
                  />
                </div>
                <label>Date:</label><br/>
                <input required
                  type="date" min={new Date().toISOString().split('T')[0]}
                  value={newDate} onChange={(e)=> setNewDate(e.target.value)}
                />
            </form>
          </Modal>
        </div>) :
        (<p>Please log in to view your workout history</p>)
      }
    </div>
  );
};

WorkoutData.propTypes = {};

export default WorkoutData;
