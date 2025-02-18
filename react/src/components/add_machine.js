import React from 'react';
import { useNavigate } from "react-router-dom";

const AddMachine = () => {

    const navigate = useNavigate();

    const handleCancle = () => {
        // Add any custom logic here, e.g., form validation
        navigate("/Home");
    };

    const handleSave = () => {
        // ต้องเปลี่ยนเป็นเซฟด้วย
        navigate("/Home");
    };

    return (
        <div className="form-2">
            <header>
                <div className="logo-lg">
                    <img className="logoimage" src="./Logo.png" alt="Logo" />
                    <h1 className="logomessage">Welcome to WashAlytics</h1>
                    <p>Please Enter your machine Information</p>
                </div>
            </header>

            <main className="main-lg">
                <h2>Machine Information</h2>
                <form className="info-form">
                    <label htmlFor="laundryname" className="tx">Machine ID</label><br />
                    <input 
                        type="text" 
                        id="laundryname" 
                        name="laundryname" 
                        className="input-bx long-input" 
                        placeholder="Machine ID" 
                    />

                    <label htmlFor="rgtnumber" className="tx password">Machine Type</label><br />
                    <select className="input-bx input-bx long-input selected" name="Type" id="Type">
                        <option value="Small Washer">Small Washer</option>
                        <option value="Medium Washer">Medium Washer</option>
                        <option value="Large Washer">Large Washer</option>
                        <option value="Dryer">Dryer</option>
                        <option value="Coin">Coin</option>
                    </select>

                    <label htmlFor="Address" className="tx password">Machine Model</label><br />
                    <input 
                        type="text" 
                        id="Address" 
                        name="Address" 
                        className="input-bx long-input" 
                        placeholder="Machine Model" 
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

export default AddMachine;