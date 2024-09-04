import React from 'react';
import SignUpForm from '../components/SignUpForm';
import petsIcon from '../pages/signupformicon.png';

const SignUp = ({ setIsLoggedIn }) => {  // Receive setIsLoggedIn as a prop
  return (
    <div className="flex justify-center items-start p-4 relative min-h-screen">
      <img src={petsIcon} alt="Pets Icon" className="absolute bottom-0 right-0  m-4 h-24 w-24" />
      <SignUpForm setIsLoggedIn={setIsLoggedIn} />  {/* Pass setIsLoggedIn to SignUpForm */}
    </div>
  );
};

export default SignUp;