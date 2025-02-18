import React from 'react';
import { useNavigate } from "react-router-dom";

const Profiles = ({Profile}) => {
    const navigate = useNavigate(); 

    const goBack = () => {
        navigate(-1);  // Go back to the previous page
    };

    return (
        <div>

            <header className='header-6'>
                <div onClick={goBack}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#29B6F6"/>
                    </svg>
                </div>

                <div className="profilecontrent">
                    <img className='profile' src={Profile.Photo} />
                </div>
                <h2>{Profile.OwnerName}</h2>
                <div>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.00001H3C2.46957 4.00001 1.96086 4.21073 1.58579 4.5858C1.21071 4.96087 1 5.46958 1 6.00001V20C1 20.5304 1.21071 21.0392 1.58579 21.4142C1.96086 21.7893 2.46957 22 3 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0392 19 20.5304 19 20V13M17.5 2.50001C17.8978 2.10219 18.4374 1.87869 19 1.87869C19.5626 1.87869 20.1022 2.10219 20.5 2.50001C20.8978 2.89784 21.1213 3.4374 21.1213 4.00001C21.1213 4.56262 20.8978 5.10219 20.5 5.50001L11 15L7 16L8 12L17.5 2.50001Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <p>{Profile.LaundryName}</p>
            </header>

            <main>
                <h2>Email</h2>
                <div className='blue-border'>
                <p>{Profile.Email}</p>
                <div>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.00001H3C2.46957 4.00001 1.96086 4.21073 1.58579 4.5858C1.21071 4.96087 1 5.46958 1 6.00001V20C1 20.5304 1.21071 21.0392 1.58579 21.4142C1.96086 21.7893 2.46957 22 3 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0392 19 20.5304 19 20V13M17.5 2.50001C17.8978 2.10219 18.4374 1.87869 19 1.87869C19.5626 1.87869 20.1022 2.10219 20.5 2.50001C20.8978 2.89784 21.1213 3.4374 21.1213 4.00001C21.1213 4.56262 20.8978 5.10219 20.5 5.50001L11 15L7 16L8 12L17.5 2.50001Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </div>
                
                <h2>Tel</h2>
                <div className='blue-border'>
                <p>{Profile.Tel}</p>
                <div>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.00001H3C2.46957 4.00001 1.96086 4.21073 1.58579 4.5858C1.21071 4.96087 1 5.46958 1 6.00001V20C1 20.5304 1.21071 21.0392 1.58579 21.4142C1.96086 21.7893 2.46957 22 3 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0392 19 20.5304 19 20V13M17.5 2.50001C17.8978 2.10219 18.4374 1.87869 19 1.87869C19.5626 1.87869 20.1022 2.10219 20.5 2.50001C20.8978 2.89784 21.1213 3.4374 21.1213 4.00001C21.1213 4.56262 20.8978 5.10219 20.5 5.50001L11 15L7 16L8 12L17.5 2.50001Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </div>
                
                <h2>Address</h2>
                <div className='blue-border'>
                <p>{Profile.Address}</p>
                <div>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.00001H3C2.46957 4.00001 1.96086 4.21073 1.58579 4.5858C1.21071 4.96087 1 5.46958 1 6.00001V20C1 20.5304 1.21071 21.0392 1.58579 21.4142C1.96086 21.7893 2.46957 22 3 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0392 19 20.5304 19 20V13M17.5 2.50001C17.8978 2.10219 18.4374 1.87869 19 1.87869C19.5626 1.87869 20.1022 2.10219 20.5 2.50001C20.8978 2.89784 21.1213 3.4374 21.1213 4.00001C21.1213 4.56262 20.8978 5.10219 20.5 5.50001L11 15L7 16L8 12L17.5 2.50001Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </div>

                <button className='input-bx'>Report Problem</button>
                <button className='red-btn'>Log out</button>
            </main>

        </div>
    )

}

export default Profiles;