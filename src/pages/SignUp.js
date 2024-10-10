import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SignUpForm from '../components/SignUpForm';
import PersonalDetailsForm from '../components/PersonalDetailsForm';

const SignUp = ({ setIsLoggedIn }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    age: '',
  });

  const navigate = useNavigate(); // Initialize navigate

  const nextStep = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setStep(2);
  };

  const completeSignUp = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setStep(3);
  };

  const handleGoBack = () => {
    navigate('/login'); // Redirect to the main page
  };

  return (
    <div className="flex justify-center items-start h-screen pt-8 relative">
      {/* Go Back Button */}
      <button
        onClick={handleGoBack}
        className="absolute top-12 left-12 w-60 bg-st text-sc font-black py-2 rounded-md hover:bg-sc hover:text-pr"
      >
        &lt; Back to login
      </button>
      
      <div className="max-w-4xl w-full">
        {step === 1 && <SignUpForm formData={formData} updateFormData={setFormData} nextStep={nextStep} />}
        {step === 2 && <PersonalDetailsForm formData={formData} completeSignUp={completeSignUp} setIsLoggedIn={setIsLoggedIn} setStep={setStep} />}
      </div>
    </div>
  );
};

export default SignUp;
