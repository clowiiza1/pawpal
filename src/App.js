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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay time to match the preloader fade-out duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Preloader />
      ) : (
        <div className="fade-i h-screen bg-pr">
          <Header />
          <main className="container mx-auto min-h-3/4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/adoptacat" element={<AdoptCat />} /> {/* New route for Adopt a Cat */}
              <Route path="/adoptadog" element={<AdoptDog />} /> {/* New route for Adopt a Dog */}
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
