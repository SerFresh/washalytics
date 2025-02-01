import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <header>
                <div className="logo-lg">
                    <img className="logoimage" src="./Logo.png" alt="Logo" />
                    <h1 className="logomessage">Welcome to WashAlytics</h1>
                    <p>Please login using the form below</p>
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

                    <a></a>
                    <label htmlFor="password" className="tx password">Password</label><br />
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="input-bx lg-pw" 
                        placeholder="password" 
                    />
                    <div className="checkbox-wrapper-42">
                        <input
                            id="Remember-me"
                            type="checkbox"
                        />
                        <label className="cbx" htmlFor="Remember-me"></label>
                        <label className="lbl" htmlFor="Remember-me">Remember me</label>
                    </div>
                    <button className="bl-btn login">Login</button>
                </form>

                <form className="ant-form">
                    <button className="wh-btn google">
                        <img className="google-img" src="./GoogleLogo.png" alt="Google Logo" /> Continue with Google
                    </button>
                    <button className="wh-btn apple">
                        <img className="apple-img" src="./AppleLogo.png" alt="Apple Logo" /> Continue with Apple
                    </button>
                </form>
                <div>
                    <p>Don't have an account? <Link to="/signup" className="link su"> Sign Up </Link></p>
                </div>
            </main>
        </div>
    );
};

export default Login;
