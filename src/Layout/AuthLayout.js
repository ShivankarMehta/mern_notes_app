import React from 'react';
import Header from '../components/Themebutton';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
      <>
        <Header /> {/* Header will be applied to these routes */}
        <Outlet /> {/* Render child routes here */}
      </>
    );
  };
  
  export default AuthLayout;