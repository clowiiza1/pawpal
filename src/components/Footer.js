import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} PawPal. All rights reserved.</p>
        <p>Follow us on <a href="https://www.facebook.com/" className="text-blue-400">Facebook</a> and <a href="https://www.twitter.com/" className="text-blue-400">Twitter</a></p>
      </div>
    </footer>
  );
};

export default Footer;
