import React from 'react';
import SignUpForm from '../components/SignUpForm';
import petsIcon from '../pages/signupformicon.png';

const SignUp = () => {
  return (
    <div className="flex justify-center items-start p-6">
      <SignUpForm />
      <img src={petsIcon} alt="Pets Icon" className="absolute bottom-10 left-10  m-4 h-24 w-24" />

    </div>
  );
};

export default SignUp;
