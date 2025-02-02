import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Button, Form, Input } from 'antd';

// const Register = () => {
interface userValues {
  name: string;
  age: number;
  email: string;
  password: string;
 }
const Register: React.FC = () =>{

  const [name, setName] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (age === undefined){
      alert('please enter a valid age');
      return
    }
    const userDetails:userValues = { name, age, email, password }
    axios.post('http://localhost:5000/api/users',userDetails)
    .then(res=>{
      console.log(res)
      alert(res.data);
      navigate('/');
    })
    .catch((err)=>{console.log(err)})
  }
  
  return (
  <div> 
    <h1>Registration</h1>
    <form onSubmit={handleSubmit}>
      <div className="userDetail">
        <label htmlFor="userName" className="required">Full Name</label>
        <input type="text" id="userName" required value={name} onChange={(e)=>setName(e.target.value)}></input>
      </div>
      <div className="userDetail">
        <label htmlFor="userAge" className="required">Age</label>
        <input type="number" id="userAge" required min={16}
          value={age} 
          onChange={(e) => setAge(Number(e.target.value))}></input>
      </div>
      <div className="userDetail">
        <label htmlFor="userEmail" className="required">Email</label>
        <input type="email" id="userEmail" required
        value={email}
        onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div className="userDetail">
        <label htmlFor="userPass" className="required">Password</label>
        <input type="password" id="userPass" required
        value={password}
        onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
)};
export default Register;

Register.propTypes = {};


