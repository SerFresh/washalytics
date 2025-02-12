import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        // Add any custom logic here, e.g., form validation
        navigate("/information_laundry");
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
                <form className="bs-form">
                    <label htmlFor="email" className="tx email">Email</label><br />
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="input-bx lg-email" 
                        placeholder="example: 12345@gmail.com" 
                    /><br />

                    <label htmlFor="password" className="tx password">Password</label><br />
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="input-bx su-pw" 
                        placeholder="password" 
                    /><br />

                    <label htmlFor="cf-password" className="tx password">Confirm Password</label><br />
                    <input 
                        type="password" 
                        id="cf-password" 
                        name="cf-password" 
                        className="input-bx su-cfpw" 
                        placeholder="password" 
                    /><br />

                    <div className="remember">
                    <div className="checkbox-wrapper-42">
                        <input
                            id="Remember-me"
                            type="checkbox"
                        />
                        <label className="cbx" htmlFor="Remember-me"></label>
                        <label className="lbl" htmlFor="Remember-me">Remember me</label>
                    </div></div>

                    <div className= "login" >
                    <button onClick={handleSignUp} className="bl-btn login">Sign Up</button>
                    </div></form>

                <form className="ant-form">
                    <button className="wh-btn google">
                        <img className="google-img" src="./GoogleLogo.png" alt="Google Logo" /> Continue with Google
                    </button>
                    <button className="wh-btn apple">
                        <img className="apple-img" src="./AppleLogo.png" alt="Apple Logo" /> Continue with Apple
                    </button>
                </form>

                <div className="donthave">
                    <p>Have an account? <Link to="/login" className="link lg">Login</Link></p>
                </div>
            </main>
        </div>
    );
};

export default Signup;
