import React from 'react';
import { Alert ,Card, Typography, Form, Input, Button, Flex, Spin } from 'antd';
import { Link } from 'react-router-dom';
import gameotivityImage from "./gameotivity.png";
import useSignup from '../hooks/useSignup';
const Register = () => {
  const {loading , error , registerUser} = useSignup();
  const handleRegister = (values) => {
    registerUser(values);
  };

  return (
    <Card className='form-container'>
      <Flex>
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className='title'>
            Create your account!
          </Typography.Title>

          <Typography.Text className='move-center'>
            Already have an account?{' '}
            <Link to="/login" className="link">
              Sign in here
            </Link>
          </Typography.Text>

          <Form layout='vertical' onFinish={handleRegister} autoComplete='off'>
            <Form.Item label="Full Name" name='name' rules={[
              { required: true, name: 'name', message: 'Please enter your full name' }
            ]}>
              <Input size='large' placeholder='Enter your full name' />
            </Form.Item>

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

            <Form.Item label="Confirm Password" name='passwordConfirm' rules={[
              { required: true, message: 'Please input your confirm Password!' }
            ]}>
              <Input.Password size='large' placeholder='Re-enter your Password' />
            </Form.Item>
        
          {
            error && <Alert description = {error} type = 'error'
             showIcon
             closable 
             className= 'alert'
             /> 
          }

            <Form.Item>
              <Button
               type={`${loading} ? '' : 'primary'`} 
              htmlType="submit" size='large' className='btn'>
                {loading ? <Spin/> : 'Create Account'}
           
                </Button>
            </Form.Item>
          </Form>
        </Flex>
        
      </Flex>
    </Card>
  );
};

export default Register;
