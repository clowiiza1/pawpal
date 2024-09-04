import React from 'react';
import LoginForm from '../components/LoginForm';
import petsIcon from '../pages/loginformicon.png';

const Login = ({ setIsLoggedIn }) => {
  return (
    <div className=" flex justify-center items-start p-6 ">
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
      <img src={petsIcon} alt="Pets Icon" className="absolute bottom-2 left-4  m-4 h-24 w-24" />
    </div>
  );
};

export default Login;
