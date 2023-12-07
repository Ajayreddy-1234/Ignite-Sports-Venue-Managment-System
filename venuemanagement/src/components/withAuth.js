import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from "./Login.js";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const navigate = useNavigate();
    const isAuthenticated = Boolean(window.localStorage.getItem('userId'));

    React.useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
       return <Login />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
