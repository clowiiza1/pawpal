import React from 'react';
import SignUpForm from '../components/SignUpForm';
import petsIcon from '../pages/signupformicon.png';

const SignUp = () => {
  return (
    <div className="flex justify-center items-start p-4">
      <SignUpForm />
      <img src={petsIcon} alt="Pets Icon" className="absolute bottom-2 left-4  m-4 h-24 w-24" />

    </div>
  );
};

export default SignUp;
