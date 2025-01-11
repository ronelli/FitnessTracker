import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import Routes from '../../Routes/Routes/Routes';
import {Link} from 'react-router-dom';
import { UserContext } from '../../Users/UserContext/UserContext';

//antd
import { Menu } from 'antd';
import axios from 'axios';


const Header = () => {
  // const [username, setUsername] = useState(null)
  const {user, setUser} = useContext(UserContext);

  const logout = async() => {
    await axios.post('http://localhost:5000/api/logout',{}, {withCredentials:true})
    .then(()=> {
      setUser(null);
    }).catch(err => console.log(err));
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
            <Link to="/list">Workout list</Link>
          </li>
        </ul>
      </nav>
    {/* <BrowserRouter>
    <Routes></Routes>
    </BrowserRouter> */}
  </div>
)};

Header.propTypes = {};


export default Header;
