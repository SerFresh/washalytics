import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        // Add any additional logic, such as sending data to an API
        navigate("/add_branch");
    };

    return (
        <div className="form-0">
            <header>
                <div className="logo-lg">
                    <img className="logoimage" src="./Logo.png" alt="Logo" />
                    <h1 className="logomessage">Welcome to WashAlytics</h1>
                    <p>Please Sign Up using the form below</p>
                </div>
            </header>

            <main className="main-lg">
                <form className="bs-form" onSubmit={handleSignUp}>
                    <label htmlFor="email" className="tx">Email</label><br />
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="input-bx long-input" 
                        placeholder="example: 12345@gmail.com" 
                        required
                    />

                    <label htmlFor="password" className="tx password">Password</label><br />
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="input-bx long-input" 
                        placeholder="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="cf-password" className="tx password">Confirm Password</label><br />
                    <input 
                        type="password" 
                        id="cf-password" 
                        name="cf-password" 
                        className="input-bx long-input" 
                        placeholder="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="remember">
                    <div className="checkbox-wrapper-42">
                        <input
                            id="Remember-me"
                            type="checkbox"
                        />
                        <label className="cbx" htmlFor="Remember-me"></label>
                        <label className="lbl" htmlFor="Remember-me">Remember me</label>
                    </div></div>

                    <div className="login">
                        <button type="submit" className="bl-btn long-btn">Sign Up</button>
                    </div>
                </form>

                <form className="ant-form">
                    <button className="wh-btn long-btn">
                        <img className="google-img" src="./GoogleLogo.png" alt="Google Logo" /> Continue with Google
                    </button>
                    <button className="wh-btn long-btn">
                        <img className="apple-img" src="./AppleLogo.png" alt="Apple Logo" /> Continue with Apple
                    </button>
                </form>

                <div className="donthave">
                    <p>Have an account? <Link to="/login" className="link">Login</Link></p>
                </div>
            </main>
        </div>
    );
};

export default Signup;
