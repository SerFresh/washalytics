import React from 'react';
import { useNavigate } from "react-router-dom";

const LaundryInfo = () => {

    const navigate = useNavigate();

    const handleCancle = () => {
        // Add any custom logic here, e.g., form validation
        navigate("/add_branch");
    };

    const handleSave = () => {
        // Add any custom logic here, e.g., form validation
        navigate("/Home");
    };

    return (
        <div className="form-1">
            <header>
                <div className="logo-lg">
                    <img className="logoimage" src="./Logo.png" alt="Logo" />
                    <h1 className="logomessage">Welcome to WashAlytics</h1>
                    <p>Please Enter your laundry Information</p>
                </div>
            </header>

            <main className="main-lg">
                <h2>Laundry Information</h2>
                <form className="info-form">
                    <label htmlFor="laundryname" className="tx">Laundry Name</label><br />
                    <input 
                        type="text" 
                        id="laundryname" 
                        name="laundryname" 
                        className="input-bx long-input" 
                        placeholder="Laundry Name" 
                    />

                    <label htmlFor="rgtnumber" className="tx password">Registration Number</label><br />
                    <input
                        type="text" 
                        id="rgtnumber" 
                        name="rgtnumber" 
                        className="input-bx long-input" 
                        placeholder="Registration Number" 
                    />

                    <label htmlFor="Address" className="tx password">Address</label><br />
                    <input 
                        type="text" 
                        id="Address" 
                        name="Address" 
                        className="input-bx long-input" 
                        placeholder="Address" 
                    />

                    <label htmlFor="ownername" className="tx password">Owner Name</label><br />
                    <input 
                        type="text" 
                        id="ownername" 
                        name="ownername" 
                        className="input-bx long-input" 
                        placeholder="Owner Name" 
                    />

                    <label htmlFor="tel" className="tx password">Telephone</label><br />
                    <input
                        type="tel" 
                        id="tel" 
                        name="tel" 
                        className="input-bx long-input" 
                        placeholder="ex: 082-345-67xx" 
                    />

                    <label htmlFor="email" className="tx password">Email</label><br />
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="input-bx long-input" 
                        placeholder="ex: 12345@gmail.com" 
                    />

                    <div className='save-cancle'>
                    <button onClick={handleCancle} type="button" className="blg-btn cancel">Cancel</button>
                    <button onClick={handleSave}type="submit" className="bl-btn save">Save</button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default LaundryInfo;