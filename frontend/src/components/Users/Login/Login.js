import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';
import './login.css'

import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Login = () => {

  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const {email, password } = values;
    const loginDetails = {email, password};
    axios.post('http://localhost:5000/api/user', loginDetails, {withCredentials:true})
      .then(res=>{
        console.log(res);
        setUser(res.data.name)
        alert('Welcome ' + res.data.name);
        navigate('/');
      })
      .catch(err=>console.log(err.response?.data || err.message));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    alert('Please fill in all required fields correctly.');
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
  <div>
    <h1>Login</h1>
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}

    initialValues={{
      remember: true,
    }}
    autoComplete="off"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: "Please input your password!",
        },
      ]}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter your password"
          style={{ flex: 1 }}
        />
        <span
          tabIndex={0} // Makes the icon focusable
          role="button" // Adds semantic meaning
          aria-label={passwordVisible ? "Hide password" : "Show password"}
          onClick={togglePasswordVisibility}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") togglePasswordVisibility();
          }}
          style={{
            cursor: "pointer",
            marginLeft: 8,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {passwordVisible ? (
            <EyeTwoTone style={{ fontSize: "1rem" }} />
          ) : (
            <EyeInvisibleOutlined style={{ fontSize: "1rem" }} />
          )}
        </span>
      </div>
    </Form.Item>
    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div> 
)};

Login.propTypes = {};



export default Login;
