import React from 'react';
import './Logout.css';

function LogoutModal({ onCancel, onLogout }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Log Out</h3>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to log out?</p>
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
