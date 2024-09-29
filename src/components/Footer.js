import React from 'react';
import { FaFacebook, FaTwitter, FaPhone } from 'react-icons/fa'; // Importing Facebook, Twitter, and Phone icons
import { FaMapMarkerAlt, FaDog, FaCat, FaHandsHelping } from 'react-icons/fa'; // Importing location and additional icons
import logo from '../components/LogoPawprint.png'; // Import your logo here

const Footer = () => {
  return (
    <footer className="bg-st p-8 font-bold relative">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        
        {/* Addresses Section */}
        <div className="flex flex-col mb-4 md:mb-0 ml-4 w-1/3">
          <div className="flex items-center mb-1">
            <FaMapMarkerAlt className="mr-1 text-sc" />
            <h3 className="text-2xl font-bold text-sc">Our Offices</h3>
          </div>
          <div className="flex justify-between">
            {/* Vanderbijlpark Address */}
            <div className="text-left mr-8">
              <p className="mb-1 font-bold">Vanderbijlpark Office</p>
              <p className="mb-1">Plot 44 - 47 Boshoff Road</p>
              <p className="mb-1">Mullerstuin</p>
              <p className="mb-1">Vanderbijlpark</p>
              <p className="mb-1">1911</p>
            </div>
            {/* Vereeniging Address */}
            <div className="text-left">
              <p className="mb-1 font-bold">Vereeniging Office</p>
              <p className="mb-1">66 General Smuts Road</p>
              <p className="mb-1">Duncanville</p>
              <p className="mb-1">Vereeniging</p>
              <p className="mb-1">1939</p>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="flex flex-col mb-4 md:mb-0 ml-4 w-1/3">
          <div className="flex items-center mb-1">
            <FaPhone className="mr-1 text-sc" /> {/* Phone icon */}
            <h3 className="text-2xl font-bold text-sc">Contact Information</h3>
          </div>
          <div className="mb-1">
            <p className="mb-1 font-bold">Vanderbijlpark Office</p>
            <p className="mb-1">Phone: (012) 345-6789</p>
            <p className="mb-1">Email: vanderbijlpark@example.com</p>
          </div>
          <div>
            <p className="mb-1 font-bold">Vereeniging Office</p>
            <p className="mb-1">Phone: (098) 765-4321</p>
            <p className="mb-1">Email: vereeniging@example.com</p>
          </div>
        </div>

        {/* Logo and Navigation Links Section */}
        <div className="flex flex-col items-start w-1/4 text-right"> 
          <div className="flex flex-col">
            <a href="/adoptadog" className="text-pr hover:underline my-1 text-xl flex items-center">
              <FaDog className="mr-2" /> Adopt a Dog
            </a>
            <a href="/adoptacat" className="text-pr hover:underline my-1 text-xl flex items-center">
              <FaCat className="mr-2" /> Adopt a Cat
            </a>
            <a href="/volunteer" className="text-pr hover:underline my-1 text-xl flex items-center">
              <FaHandsHelping className="mr-2" /> Volunteer
            </a>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="absolute bottom-8 right-8">
        <img src={logo} alt="PawPal Logo" className="h-12" />
      </div>

      {/* Social Media Section */}
      <div className="mt-2 text-center">
        <p className="inline">
          Follow us on 
          <a href="https://www.facebook.com/" className="text-pr hover:underline inline-flex items-center mx-1 underline">
            <FaFacebook className="mr-1" /> Facebook
          </a>
          <span className="inline">and</span>
          <a href="https://www.twitter.com/" className="text-pr hover:underline inline-flex items-center mx-1 underline">
            <FaTwitter className="mr-1" /> Twitter
          </a>
        </p>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 text-center">
        <p className="inline">
          &copy; {new Date().getFullYear()} PawPal. All rights reserved.
        </p>
      </div>
      
    </footer>
  );
};

export default Footer;
