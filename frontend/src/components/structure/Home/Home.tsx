import React, {useContext} from 'react';
import { UserContext } from '../../Users/UserContext/UserContext';
import axios from 'axios';
import { useState, useEffect } from 'react';


// const Home = () => {
interface LastWorkout {
  date: string;
}

const Home: React.FC = () => {
  const {user} = useContext(UserContext);

  const [lastWorkout, setLastWorkout] = useState<LastWorkout | null>(null);
  useEffect(() => {
      // const workoutObj = {}
      axios.get('http://localhost:5000/api/me',{withCredentials:true})
      .then((res)=>{
        const $id = res.data._id;
        if($id){
          return axios.post('http://localhost:5000/api/lastWorkout',{userId:$id})
        }
      }).then((workoutRes)=>{
        if(workoutRes?.data){
          setLastWorkout(workoutRes.data);
        }
      })
      .catch((err)=>{
        console.log(err.message);
      })
  },[])

  return(
  <div>
    <h1>
    Fitness Tracker
    </h1>
    {user && lastWorkout ? (
      <div>
        <p>Your last workout:</p>
        <strong>
          {Math.ceil((Date.now() - new Date(lastWorkout.date).getTime()) / (1000 * 60 * 60 * 24))} days ago
        </strong>
      </div>
    ) :"Check"}
  </div>
  );
}

export default Home;
