// src/Layout.jsx - CORRECT
import React from 'react';
import Navbar from './Component/Navbar.jsx'; // Make sure extension is .jsx

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </>
  );
};

export default Layout;