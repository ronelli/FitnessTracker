import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import Routes from '../../Routes/Routes/Routes';
import {Link} from 'react-router-dom';
import { UserContext } from '../../Users/UserContext/UserContext';

//antd
import { Menu } from 'antd';


const Header = () => {
  // const [username, setUsername] = useState(null)
  const {user} = useContext(UserContext);
return (
  <div className='Header'>
    <div className='userName'>
        {user ? <span>Hello, {user} </span> : <span>Hello, Guest</span>}
      <span>
      </span>
    </div>
    <nav className='sitePages'>
        <ul>
          <li>
            <Link to="/register">Registration</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
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
