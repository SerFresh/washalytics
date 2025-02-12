import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [isVisible, setIsVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div className="form">
      <header className="logo-lg">
          <img className="logoimage" src="./Logo.png" alt="Logo" />
          <h1 className="logomessage">Welcome to WashAlytics</h1>
          <p>Please login using the form below</p>
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

          <label htmlFor="password" className="tx password">Password</label>
          <a className ='forgot' href="#">Forget password?</a><br />
          
          <div className="password-input-wrapper">
            <input
              type={passwordType}
              id="password"
              name="password"
              className="input-bx lg-pw"
              placeholder="password"
            />
            <span onClick={togglePasswordVisibility} className="eye-icon">
              {isVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              )}
            </span>
          </div>
          
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
          <button className="bl-btn login">Login</button>
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
          <p>Don't have an account? <Link to="/signup" className="link su">Sign Up</Link></p>
        </div>
      </main>
    </div>
  );
};

export default Login;