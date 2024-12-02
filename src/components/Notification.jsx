import React, { useEffect } from "react";
import "../styles/Notification.css";
import correct from "../assets/Icons/g-correct.png";
import { TickCircle } from "iconsax-react";

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
        <TickCircle size="32" color="green" variant="Bold" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
