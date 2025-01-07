import React from 'react';
import PropTypes from 'prop-types';
import Schedule from '../../workout/Schedule/Schedule/Schedule';

import { Routes, Route}  from 'react-router-dom';
import Register from '../../Users/Register/Register/Register';
import Login from '../../Users/Login/Login';
import Home from '../Home/Home';
import WorkoutData from '../../workout/List/WorkoutData/WorkoutData';

const Main = () => (
  <div className='Main'>
    <div>
      <Routes>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path='/new-workout' element={<Schedule/>}/>
        <Route exact path="/list" element={<WorkoutData />} />
      </Routes>
    </div>
  </div>
);

Main.propTypes = {};



export default Main;
