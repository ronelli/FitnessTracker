import React, {useState, useEffect} from 'react';
import WorkoutHistory from '../WorkoutHistory/WorkoutHistory';
import { Workout } from '../../../types/Workout';
import axios, {AxiosResponse} from '../../../../node_modules/axios/index';
import { User } from '../../../types/User';
import ManualWorkout from './ManualWorkout';


const Dashboard: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    useEffect(()=>{
        axios
            // .get<Workout[]>('http://localhost:5000/api/user_workouts')
            .get<User>('http://localhost:5000/api/me',{withCredentials:true})
            .then((res:AxiosResponse <User>)=>{
                const userData = res.data;
                axios.get<Workout[]>(`http://localhost:5000/api/user-history?userId=${userData._id}`)
                .then((res:AxiosResponse <Workout[]>) =>  {
                setWorkouts(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
    },[])
    return (
        <div>
            <h1>Dashboard</h1>
            <WorkoutHistory workouts={workouts}/>
            <ManualWorkout />
        </div>
    );
}

export default Dashboard;