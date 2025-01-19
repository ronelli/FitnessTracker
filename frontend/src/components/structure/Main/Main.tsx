import React from 'react';
import PropTypes from 'prop-types';
// import Schedule from '../../workout/Schedule/Schedule/Schedule';

import { Routes, Route}  from 'react-router-dom';
// import Register from '../../Users/Register/Register/Register';
// import Login from '../../Users/Login/Login';
import Home from '../Home/Home';
import Login from '../../Users/Login/Login';
import Register from '../../Users/Register/Register';
import Schedule from '../../workout/Schedule/Schedule';

import WorkoutData from '../../workout/WorkoutData/WorkoutData';
import Dashboard from '../../workout/Dashboard/Dashboard';


const Main: React.FC = () => (
  <div className='Main'>
    <div>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path='/new-workout' element={<Schedule/>}/>
        <Route path="/calendar" element={<WorkoutData />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  </div>
)
// const Main = () => (
//   <div className='Main'>
//     <div>
//       <Routes>
        // <Route exact path="/register" element={<Register />}/>
//         <Route exact path="/" element={<Home />}/>
//         <Route exact path="/login" element={<Login />}/>
//         <Route exact path='/new-workout' element={<Schedule/>}/>
//         <Route exact path="/calendar" element={<WorkoutData />} />
//         <Route exact path="/dashboard" element={<Dashboard/>} />
//       </Routes>
//     </div>
//   </div>
// );

// Main.propTypes = {};



export default Main;
