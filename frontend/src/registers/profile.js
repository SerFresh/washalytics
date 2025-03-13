import React from 'react';
import { useNavigate } from "react-router-dom";

const Profiles = ({Profile}) => {
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        localStorage.removeItem('isLoggedIn');  // ลบสถานะการล็อกอินออกจาก localStorage
        navigate("/");  // นำผู้ใช้ไปที่หน้าแรก
    };

    const goBack = () => {
        navigate(-1);  // Go back to the previous page
    };

    return (
        <div>
            <header className='header-7'>
                <div className='backbutton' onClick={goBack}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#29B6F6"/>
                    </svg>
                </div>

                    <div className="profilecontrent">
                        <img className='profile' src={Profile.Photo} />
                    </div>

                    <div className='edit-img'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_358_1496)">
                        <path d="M19.1666 15.8333C19.1666 16.2754 18.991 16.6993 18.6784 17.0118C18.3659 17.3244 17.9419 17.5 17.4999 17.5H2.49992C2.05789 17.5 1.63397 17.3244 1.32141 17.0118C1.00885 16.6993 0.833252 16.2754 0.833252 15.8333V6.66667C0.833252 6.22464 1.00885 5.80072 1.32141 5.48816C1.63397 5.17559 2.05789 5 2.49992 5H5.83325L7.49992 2.5H12.4999L14.1666 5H17.4999C17.9419 5 18.3659 5.17559 18.6784 5.48816C18.991 5.80072 19.1666 6.22464 19.1666 6.66667V15.8333Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.99992 14.1667C11.8409 14.1667 13.3333 12.6743 13.3333 10.8333C13.3333 8.99238 11.8409 7.5 9.99992 7.5C8.15897 7.5 6.66658 8.99238 6.66658 10.8333C6.66658 12.6743 8.15897 14.1667 9.99992 14.1667Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_358_1496">
                        <rect width="20" height="20" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </div>

                <div className='profilecenter'>  
                    <h2><span className='edit-info'>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4.00001H3C2.46957 4.00001 1.96086 4.21073 1.58579 4.5858C1.21071 4.96087 1 5.46958 1 6.00001V20C1 20.5304 1.21071 21.0392 1.58579 21.4142C1.96086 21.7893 2.46957 22 3 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0392 19 20.5304 19 20V13M17.5 2.50001C17.8978 2.10219 18.4374 1.87869 19 1.87869C19.5626 1.87869 20.1022 2.10219 20.5 2.50001C20.8978 2.89784 21.1213 3.4374 21.1213 4.00001C21.1213 4.56262 20.8978 5.10219 20.5 5.50001L11 15L7 16L8 12L17.5 2.50001Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>  
                    {Profile.OwnerName}
                    <span className='edit-info'>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4.00001H3C2.46957 4.00001 1.96086 4.21073 1.58579 4.5858C1.21071 4.96087 1 5.46958 1 6.00001V20C1 20.5304 1.21071 21.0392 1.58579 21.4142C1.96086 21.7893 2.46957 22 3 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0392 19 20.5304 19 20V13M17.5 2.50001C17.8978 2.10219 18.4374 1.87869 19 1.87869C19.5626 1.87869 20.1022 2.10219 20.5 2.50001C20.8978 2.89784 21.1213 3.4374 21.1213 4.00001C21.1213 4.56262 20.8978 5.10219 20.5 5.50001L11 15L7 16L8 12L17.5 2.50001Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    </h2>
                    <p className='ProfileLaundryName'>{Profile.LaundryName}</p>
                </div>
            </header>

            <main className='main-profile'>
                <h2>Email</h2>
                <div className='blue-border sq'>
                <p>{Profile.Email}</p>
                <div className='edit'>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.00001H3C2.46957 4.00001 1.96086 4.21073 1.58579 4.5858C1.21071 4.96087 1 5.46958 1 6.00001V20C1 20.5304 1.21071 21.0392 1.58579 21.4142C1.96086 21.7893 2.46957 22 3 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0392 19 20.5304 19 20V13M17.5 2.50001C17.8978 2.10219 18.4374 1.87869 19 1.87869C19.5626 1.87869 20.1022 2.10219 20.5 2.50001C20.8978 2.89784 21.1213 3.4374 21.1213 4.00001C21.1213 4.56262 20.8978 5.10219 20.5 5.50001L11 15L7 16L8 12L17.5 2.50001Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </div>
                
                <h2>Tel</h2>
                <div className='blue-border sq'>
                <p>{Profile.Tel}</p>
                <div className='edit'>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.00001H3C2.46957 4.00001 1.96086 4.21073 1.58579 4.5858C1.21071 4.96087 1 5.46958 1 6.00001V20C1 20.5304 1.21071 21.0392 1.58579 21.4142C1.96086 21.7893 2.46957 22 3 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0392 19 20.5304 19 20V13M17.5 2.50001C17.8978 2.10219 18.4374 1.87869 19 1.87869C19.5626 1.87869 20.1022 2.10219 20.5 2.50001C20.8978 2.89784 21.1213 3.4374 21.1213 4.00001C21.1213 4.56262 20.8978 5.10219 20.5 5.50001L11 15L7 16L8 12L17.5 2.50001Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </div>
                
                <h2>Address</h2>
                <div className='blue-border sq'>
                <p>{Profile.Address}</p>
                <div className='edit'>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.00001H3C2.46957 4.00001 1.96086 4.21073 1.58579 4.5858C1.21071 4.96087 1 5.46958 1 6.00001V20C1 20.5304 1.21071 21.0392 1.58579 21.4142C1.96086 21.7893 2.46957 22 3 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0392 19 20.5304 19 20V13M17.5 2.50001C17.8978 2.10219 18.4374 1.87869 19 1.87869C19.5626 1.87869 20.1022 2.10219 20.5 2.50001C20.8978 2.89784 21.1213 3.4374 21.1213 4.00001C21.1213 4.56262 20.8978 5.10219 20.5 5.50001L11 15L7 16L8 12L17.5 2.50001Z" stroke="#7399AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </div>
                <div className='report'>
                    <button className='input-bx long-btn'>Report Problem</button>
                    <button className='red-btn long-btn' onClick={handleLogOut}>Log out</button>
                </div>
            </main>

        </div>
    )

}

export default Profiles;