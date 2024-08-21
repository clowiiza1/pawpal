import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'adopter',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="adopter">Adopter</option>
          <option value="volunteer">Volunteer</option>
        </select>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
