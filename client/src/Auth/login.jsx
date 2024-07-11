import React from 'react';
import { Alert ,Card, Typography, Form, Input, Button, Flex, Spin } from 'antd';
import { Link } from 'react-router-dom';
import gameotivityImage from "./gameotivity.png";
import userLogin from '../hooks/userLogin';

const Login = () => {
  const {error,loading,loginUser} = userLogin();
  const handlelogin = async (values) => {
  await loginUser(values);
  };

  return (
    <Card className='form-container'>
      <Flex>
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className='title'>
            Welcome Back
          </Typography.Title>

          <Typography.Text className='move-center'>
            Don't have an account?{' '}
            <Link to="/login" className="link">
              Create Account
            </Link>
          </Typography.Text>

          <Form layout='vertical' onFinish={handlelogin} autoComplete='off'>
           
            <Form.Item label="Email" name='email' rules={[
              { required: true, name: 'email', message: 'Please input your Email' },
              { type: 'email', message: "The input is not valid Email" }
            ]}>
              <Input size='large' placeholder='Enter your Email' />
            </Form.Item>

            <Form.Item label="Password" name='password' rules={[
              { required: true, message: 'Please input your Password!' }
            ]}>
              <Input.Password size='large' placeholder='Enter your Password' />
            </Form.Item>
        
          {
            error && <alert description = {error} type = 'error'
             showIcon
             closable 
             className= 'alert'/> 
          }

            <Form.Item>
              <Button
                type={`${loading} ? '' : 'primary'`} 
              htmlType="submit" size='large' className='btn'>
                {loading ? <Spin/> : 'Sign In'}
                Sign In
                </Button>
            </Form.Item>
          </Form>
        </Flex>
        
      </Flex>
    </Card>
  );
};

export default Login;
