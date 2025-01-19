import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Users/UserContext/UserContext';

const Header: React.FC = () => {
  const {user, setUser} = useContext(UserContext); 

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout',{}, {withCredentials:true});
      setUser(null);
    }
    catch(err) {
      console.log(err);
    }
  }
  return (
    <div className='Header'>
      <div className='userName'>
        {user ? <span>Hello, {user} </span> : <span>Hello, Guest</span>}
      <span>
      </span>
    </div>
    <nav className='sitePages'>
        <ul>
          {!user ?(
          <>
            <li>
              <Link to="/register">Registration</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
          ): 
            <li>
              <Link to="/home" onClick={logout}>Sign out</Link>
            </li>
          }
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new-workout">Schedule a Workout</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header;
