import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.svg';

const HomePage = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Link to="/counter">Counter Page
      </Link>
    </header>
  );
};

export default HomePage;
