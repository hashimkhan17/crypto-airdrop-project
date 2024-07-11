import { Avatar, Button, Card, Typography, Row, Col } from 'antd';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const { userData, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Card className='profile-card'>
      <Row gutter={16} align="middle">
        <Col>
          <Avatar size={150} icon={<UserOutlined />} className='avatar' />
        </Col>
        <Col>
          <Typography.Title level={2} strong className='username'>{userData.name}</Typography.Title>
          <Typography.Text type='secondary' strong>Email: {userData.email}</Typography.Text>
          <div className="role-info">
            <Typography.Text type='secondary'>Role:</Typography.Text>
            <Typography.Text className="role">{userData.role}</Typography.Text>
          </div>
          <Button size='large' type="primary" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard;
