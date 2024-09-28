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
import AdoptBooking from './pages/AdoptBooking';
import AdopterInfo from './pages/AdopterInfoTemp';
import Calendar from './pages/Calendar';

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    // Function to check if all images are loaded
    const loadImages = (imageUrls) => {
      return Promise.all(
        imageUrls.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(url);
            img.onerror = () => reject(url);
          });
        })
      );
    };

    // List of image URLs to preload
    const imageUrls = [
      './pages/header1.jpg',
      './pages/header2.jpg',
      './pages/header4/jpg'
      // Add other image URLs here
    ];

    // Load images and hide preloader when done
    loadImages(imageUrls)
      .then(() => {
        // Set a minimum time for the preloader to be visible
        setTimeout(() => setLoading(false), 1500); // Adjust the timeout duration as needed
      })
      .catch((error) => {
        console.error('Error loading image:', error);
        setTimeout(() => setLoading(false), 1000); // Ensure preloader hides even if there is an error
      });

  }, []);

  return (
    <Router>
      {loading ? (
        <Preloader />
      ) : (
        <div className="fade-i min-h-screen bg-pr min-w-full">
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <main className="justify-center  min-h-4/5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/adoptacat" element={<AdoptCat />} />
              <Route path="/adoptadog" element={<AdoptDog />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/adoptbooking" element={<AdoptBooking />} />
              <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/adopterinfo" element={<AdopterInfo />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
