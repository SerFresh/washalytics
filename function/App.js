import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


import { Review, Machine, Profile, Income } from './components/Data.js';
import Reviews from './components/Reviews.js';
import Machines from './components/machine.js';
import MachineDetail from './components/machinedetail.js';
import Finances from './components/finance.js';
import Analytics from './components/analytics.js';
import './App.css';
import './components/finance.css'
import './registers/styles.css'
import './components/home.css'
import './components/review.css'
import './components/machine.css'
import './components/analytics.css'
import AddMachine from './components/add_machine.js';
import Home from './components/home'; 
import Firstpage from './registers/firstpage';
import Login from './registers/login';
import Signup from './registers/signup';
import Addbransh from './registers/add';
import LaundryInfo from './registers/laundryInfo';
import Profiles from './registers/profile.js';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ตรวจสอบสถานะการล็อกอินเมื่อเปิดแอปครั้งแรก
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus) {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the first page */}
          <Route path="/" element={<Firstpage />} />

          {/* ถ้าไม่ได้ล็อกอินให้ไปที่หน้า Login */}
          {!isLoggedIn ? (
            <Route path="*" element={<Navigate to="/login" />} />
          ) : (
            <>
              {/* Route for Home */}
              <Route path="/home" element={<Home Profile={Profile} Review={Review} Machine={Machine} />} />

              {/* Route for Reviews */}
              <Route path="/review" element={<Reviews Profile={Profile} Review={Review} />} />

              {/* Route for Add Branch */}
              <Route path="/add_branch" element={<Addbransh />} />

              {/* Route for Laundry Info */}
              <Route path="/information_laundry" element={<LaundryInfo />} />

              {/* Route for Add Machine */}
              <Route path="/add" element={<AddMachine />} />

              {/* Route for Machines */}
              <Route path="/machine" element={<Machines Profile={Profile} Machine={Machine} />} />

              {/* Route for Machine Details */}
              <Route path="/machine/:ID" element={<MachineDetail Machine={Machine} />} />

              {/* Route for Profile */}
              <Route path="/profile" element={<Profiles Profile={Profile} />} />

              {/* Route for Accounting */}
              <Route path="/accounting" element={<Finances Profile={Profile} Income={Income} />} />

              {/* Route for Analytics */}
              <Route path="/Analytics" element={<Analytics Profile={Profile} Machine={Machine} Income={Income} />} />
            </>
          )}

          {/* Route for Login */}
          <Route path="/login" element={<Login />} />

          {/* Route for Signup */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
