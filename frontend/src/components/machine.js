import React, { useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

const Machines = ({Machine, Profile}) => {
    const navigate = useNavigate();
    const [isDetailVisible, setIsDetailVisible] = useState(null); // Track individual machine detail visibility

    const handleBack = () => {
        setIsDetailVisible(false); // Reset detail view when going back
        
    };

    const toggleDetail = (id) => {
        setIsDetailVisible(prev => prev === id ? null : id); // Toggle individual machine detail
    };

    const handleProfile = () => {
        navigate("/profile");
    };

    const getStyleByTimes = (times) => {
        if (times < 50) {
            return { background: '#B8CF7E' };
        } else if (times >= 50 && times <= 100) {
            return { background: '#FFC96B' };
        } else {
            return { background: '#FF796D' };
        }
    };

    const MachineDetail = ({ machine }) => {
        const { ID } = useParams(); 

        if (!machine) {
            return <p>Machine not found</p>; 
        }

        return (
            <div className={`detail ${isDetailVisible ? 'show' : ''}`}>
                <header className='header-6' style={getStyleByTimes(parseInt(machine.Times))}>
                    <div className='backbutton'  onClick={handleBack}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="white"/>
                        </svg>
                    </div>
                    <h1 className='model-1'>{machine.Model}</h1>
                </header>
                <main className='main-6'>
                    <div>
                        <img className='img-machine' src="/Machine.png" alt="Machine" />
                        <div className='MCTitle'>
                            <div className='hr-bottom'> 
                                <h3>Model</h3><p className='MCResult'>{machine.Model}</p>
                            </div>
                            <div className='hr-bottom'>
                                <h3>Machine Type</h3><p className='MCResult'>{machine.Type}</p>
                            </div>
                            <div className='hr-bottom'>
                                <h3>Installation Date</h3><p className='MCResult'>{machine.Installation}</p>
                            </div>
                            <div className='hr-bottom'>
                            <h3>Last Maintenance</h3><p className='MCResult'>{machine.LastMaintenance}</p>
                            </div>
                        </div>
                    </div>
                    {parseInt(machine.Times) > 100 && (
                        <div className='warning red-btn'>
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.3 4.19991C10.1779 4.32452 10.1095 4.49207 10.1095 4.66657C10.1095 4.84107 10.1779 5.00862 10.3 5.13324L11.3667 6.19991C11.4913 6.32206 11.6589 6.39048 11.8334 6.39048C12.0079 6.39048 12.1754 6.32206 12.3 6.19991L14.8134 3.68657C15.1486 4.42736 15.2501 5.25273 15.1043 6.05267C14.9586 6.85261 14.5725 7.58913 13.9975 8.16409C13.4226 8.73905 12.6861 9.12513 11.8861 9.27088C11.0862 9.41663 10.2608 9.31513 9.52003 8.9799L4.91336 13.5866C4.64814 13.8518 4.28843 14.0008 3.91336 14.0008C3.53829 14.0008 3.17858 13.8518 2.91336 13.5866C2.64814 13.3214 2.49915 12.9616 2.49915 12.5866C2.49915 12.2115 2.64814 11.8518 2.91336 11.5866L7.52003 6.9799C7.1848 6.23911 7.0833 5.41375 7.22905 4.61381C7.37481 3.81387 7.76088 3.07734 8.33584 2.50239C8.9108 1.92743 9.64732 1.54135 10.4473 1.3956C11.2472 1.24985 12.0726 1.35135 12.8134 1.68657L10.3 4.19991Z" stroke="#F5F5F5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className='warningicon'>Maintenance Request</span>
                        </div>
                    )}
                </main>
            </div>
        );
    };

    const renderMachines = (type) => {
        return Machine.filter(machine => machine.Type === type).map((machine) => (
            <div 
                className='machinebox' 
                onClick={() => toggleDetail(machine.ID)} 
                key={machine.ID} 
                style={getStyleByTimes(parseInt(machine.Times))}
            >
                <div>
                    <img className='imgmachine' src="/Machine.png" alt="Machine" />
                    <p className='model'>{machine.Model}</p>
                    <p className='times'>Times: {machine.Times}</p>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <header className='header-3'>
                <div onClick={handleProfile} className="profile-contrent right">
                    <img className='profile' src={Profile.Photo} />
                </div>
                <h2 className='TxReview' >Machine</h2>
            </header>

            <main className='main-machine'>
                {['Small Washer', 'Medium Washer', 'Large Washer', 'Dryer'].map(type => (
                    <div key={type}>
                        <h2>{type}</h2>
                        <div id="scrollx">
                            {renderMachines(type)}
                        </div>
                    </div>
                ))}
            </main>
            
            <footer>
            <Link to="/Home" className='svg-icon'>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 22V12H15.5V22M3.5 9L12.5 2L21.5 9V20C21.5 20.5304 21.2893 21.0391 20.9142 21.4142C20.5391 21.7893 20.0304 22 19.5 22H5.5C4.96957 22 4.46086 21.7893 4.08579 21.4142C3.71071 21.0391 3.5 20.5304 3.5 20V9Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='icon'>Home</p>
            </Link>

            <Link to="/Analytics" className='svg-icon'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_598_419)">
                <path d="M23 6L13.5 15.5L8.5 10.5L1 18M23 6H17M23 6V12" stroke="#7399AA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_598_419">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            <p className='icon'>Analytics</p>
            </Link>

            <Link to="/Machine" className='svg-icon'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_235_738)">
            <path d="M20.25 0.75H3.75C2.92157 0.75 2.25 1.42157 2.25 2.25V21.75C2.25 22.5784 2.92157 23.25 3.75 23.25H20.25C21.0784 23.25 21.75 22.5784 21.75 21.75V2.25C21.75 1.42157 21.0784 0.75 20.25 0.75Z" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.25 3.75H8.25" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 3.20001V4.20001" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 3.20001V4.20001" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.25 6.75H21.75" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 20.25C14.8995 20.25 17.25 17.8995 17.25 15C17.25 12.1005 14.8995 9.75 12 9.75C9.10051 9.75 6.75 12.1005 6.75 15C6.75 17.8995 9.10051 20.25 12 20.25Z" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.75 15C9.75 14.4033 9.98705 13.831 10.409 13.409C10.818 13 11.3683 12.7647 11.9451 12.7507" stroke="#29B6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_235_738">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            <p className='icon  active-icon'>Machine</p>
            </Link>

            <Link to="/Accounting" className='svg-icon'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_422_231)">
                <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#7399AA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_422_231">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            <p className='icon'>Accounting</p>
            </Link>
            <Link to="/Review" className='svg-icon'>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 2L14.59 8.26L21.5 9.27L16.5 14.14L17.68 21.02L11.5 17.77L5.32 21.02L6.5 14.14L1.5 9.27L8.41 8.26L11.5 2Z" stroke="#7399AA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <p className='icon'>Review</p>
            </Link>
            </footer>


            <div>
                {isDetailVisible && <MachineDetail machine={Machine.find(m => m.ID === isDetailVisible)} />}
            </div>
        </div>
    );
};

export default Machines;