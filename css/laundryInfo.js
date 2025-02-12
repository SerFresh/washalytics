import React from 'react';
import { useNavigate } from "react-router-dom";

const LaundryInfo = () => {

    const navigate = useNavigate();

    const handleCancle = () => {
        // Add any custom logic here, e.g., form validation
        navigate("/");
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
                    <label htmlFor="laundryname" className="tx laundryname">Laundry Name</label><br />
                    <input 
                        type="text" 
                        id="laundryname" 
                        name="laundryname" 
                        className="input-bx su-laundryname" 
                        placeholder="Laundry Name" 
                    /><br />

                    <label htmlFor="rgtnumber" className="tx rgtnumber">Registration Number</label><br />
                    <input
                        type="text" 
                        id="rgtnumber" 
                        name="rgtnumber" 
                        className="input-bx su-rgtnumber" 
                        placeholder="Registration Number" 
                    /><br />

                    <label htmlFor="Address" className="tx Address">Address</label><br />
                    <input 
                        type="text" 
                        id="Address" 
                        name="Address" 
                        className="input-bx su-Address" 
                        placeholder="Address" 
                    /><br />

                    <label htmlFor="ownername" className="tx ownername">Owner Name</label><br />
                    <input 
                        type="text" 
                        id="ownername" 
                        name="ownername" 
                        className="input-bx su-ownername" 
                        placeholder="Owner Name" 
                    /><br />

                    <label htmlFor="tel" className="tx tel">Telephone</label><br />
                    <input
                        type="tel" 
                        id="tel" 
                        name="tel" 
                        className="input-bx su-tel" 
                        placeholder="ex: 082-345-67xx" 
                    /><br />

                    <label htmlFor="email" className="tx email">Email</label><br />
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="input-bx su-email" 
                        placeholder="ex: 12345@gmail.com" 
                    /><br />
                    
                    <button onClick={handleCancle} type="button" className="blg-btn cancel">Cancel</button>
                    <button type="submit" className="bl-btn save">Save</button>
                </form>
            </main>
        </div>
    );
};

export default LaundryInfo;
