import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { message } from 'antd';

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Changed from null to false

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError('Passwords do not match'); // Changed error message for clarity
    }

    try {
      setError(null);
      setLoading(true); // Changed to true when loading starts
      const res = await fetch('http://localhost:3030/auth/signup', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json' // Added Content-Type header
        }
      });

      const data = await res.json();

      if (res.status === 201) {
        message.success(data.message);
        login(data.token, data.user);
      } else if (res.status === 400) { // Changed status code from 4000 to 400
        setError(data.message);
      } else {
        message.error('Registration failed');
      }
    } catch (error) {
      message.error(error.message); // Changed to error.message
    } finally {
      setLoading(false); // Changed to false when loading ends
    }
  };

  return { loading, error, registerUser };
};

export default useSignup;
