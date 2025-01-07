import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../Users/UserContext/UserContext';
import axios from 'axios';
import { useState, useEffect } from 'react';


const Home = () => {

  const {user} = useContext(UserContext);

  const [lastWorkout, setLastWorkout] = useState();
  useEffect(() => {
      // const workoutObj = {}
      axios.get('http://localhost:5000/api/me',{withCredentials:true})
      .then((res)=>{
        const $id = res.data._id;
        if($id){
          return axios.post('http://localhost:5000/api/lastWorkout',{userId:$id})
        }
      }).then((workoutRes)=>{
        setLastWorkout(workoutRes.data);
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
          {Math.ceil((Date.now() - new Date(lastWorkout.date)) / (1000 * 60 * 60 * 24))} days ago
        </strong>
      </div>
    ) :""}
    <table>
      <thead>
        <tr>
          <th>component</th>
          <th>branch</th>
          <th>priority</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>schedule workout</td>
          <td>Single workout</td>
          <td>1</td>
          <td>done</td>
        </tr>
        <tr>
          <td>workout results</td>
          <td>Single workout</td>
          <td>2</td>
          <td>done</td>
        </tr>
        <tr>
          <td>reports</td>
          <td>statistics</td>
          <td>3</td>
          <td></td>
        </tr>
        <tr>
          <td>Last workout</td>
          <td>statistics</td>
          <td>3</td>
          <td>done</td>
        </tr>
      </tbody>
    </table>
  </div>
  );
}

Home.propTypes = {};



export default Home;
