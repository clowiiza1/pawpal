import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdoptCat from './pages/AdoptCat'; // Import AdoptCat component
import AdoptDog from './pages/AdoptDog'; // Import AdoptDog component
import Volunteer from './pages/Volunteer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import './App.css'; // Ensure this path is correct
import Profile from './pages/Profile'; // Import Profile

function App() {
  // Define loading state to manage preloader
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay time to match the preloader fade-out duration

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <Router>
      {loading ? (
        <Preloader />
      ) : (
        <div className="fade-i min-h-screen bg-pr">
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <main className="container justify-center mx-auto min-h-4/5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/adoptacat" element={<AdoptCat />} />
              <Route path="/adoptadog" element={<AdoptDog />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/profile" element={<Profile />} /> {/* Add the Profile route */}
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
