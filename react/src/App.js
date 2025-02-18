import React from 'react';
import { Review, Machine, Profile } from './components/Data.js';
import Reviews from './components/Reviews.js';
import Machines from './components/machine.js';
import MachineDetail from './components/machinedetail.js';
import './App.css';
import './registers/styles.css'
import './components/home.css'
import './components/review.css'
import './components/machine.css'
import AddMachine from './components/add_machine.js';
import Home from './components/home'; 
import Firstpage from './registers/firstpage';
import Login from './registers/login';
import Signup from './registers/signup';
import Addbransh from './registers/add';
import LaundryInfo from './registers/laundryInfo';
import Profiles from './registers/profile.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
        <div className="App">
          <Routes>
            {/* เส้นทางสำหรับหน้าแรก */}
            <Route path="/" element={<Firstpage />} />
            
            {/* เส้นทางสำหรับ Log in */}
            <Route path="/login" element={<Login />} />

            {/* เส้นทางสำหรับ Sign up */}
            <Route path="/signup" element={<Signup />} />

            {/* เส้นทางสำหรับ Sign up */}
            <Route path="/add_branch" element={<Addbransh />} />

            {/* เส้นทางสำหรับ Sign up */}
            <Route path="/information_laundry" element={<LaundryInfo />} />

            {/* เส้นทางสำหรับ Main */}
            <Route path="/Home" element={<Home Profile={Profile} Review={Review} Machine={Machine}/>} />

            {/* เส้นทางสำหรับ Main */}
            <Route path="/Review" element={<Reviews Profile={Profile} Review={Review}/>} />

            {/* เส้นทางสำหรับ Main */}
            <Route path="/add" element={<AddMachine/>} />

            <Route path="/Machine" element={<Machines Profile={Profile} Machine={Machine} />} />
            <Route path="/Machine/:ID" element={<MachineDetail Machine={Machine} />} />

            <Route path="/Profile" element={<Profiles Profile={Profile}/>} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;