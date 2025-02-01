import './App.css';
import Firstpage from './registers/firstpage';
import Login from './registers/login';
import Signup from './registers/signup';
import LaundryInfo from './registers/laundryInfo';
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
            <Route path="/information_laundry" element={<LaundryInfo />} />

          </Routes>
        </div>
      </Router>
    );
}

export default App;
