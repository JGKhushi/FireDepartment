import React from "react";
import "./EmergencyContact.css";

const EmergencyContact = () => {
  const emergencyContacts = [
    { department: "Fire Department", phone: "101", email: "firedept@example.com" },
    { department: "Ambulance", phone: "102", email: "ambulance@example.com" },
    { department: "Police", phone: "100", email: "police@example.com" },
    { department: "Disaster Management", phone: "108", email: "disaster@example.com" },
  ];

  return (
    <div className="emergency-container">
      <h2 className="emergency-title">🚨 Emergency Contacts</h2>
      <p className="emergency-subtitle">Reach out to emergency services instantly.</p>
      <div className="emergency-list">
        {emergencyContacts.map((contact, index) => (
          <div key={index} className="emergency-card fade-in">
            <h3>{contact.department}</h3>
            <p>📞 <a href={`tel:${contact.phone}`} className="call-btn">{contact.phone}</a></p>
            <p>✉️ <a href={`mailto:${contact.email}`} className="email-btn">{contact.email}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContact;
