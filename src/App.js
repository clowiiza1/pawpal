import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Animals from './pages/Animals';
import Volunteer from './pages/Volunteer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;


