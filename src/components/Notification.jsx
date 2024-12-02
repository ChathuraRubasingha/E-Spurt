import React, { useEffect } from 'react';
import '../styles/Notification.css';
import correct from '../assets/Icons/g-correct.png'

const Notification = ({ message, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [onClose]);
  
    if (!message) return null;
  
    return (
        <div className="notification-overlay">
        <div className="notification-popup">
        <div className='n-icon'>
            <img src={correct} alt='correct-icon'/>
        </div>
          <p>{message}</p>
        </div>
      </div>
    );
  };
  
  export default Notification;