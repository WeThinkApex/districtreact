import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../redux/userRelated/userSlice';
import './Logout.css'; // ✅ Import external CSS

const Logout = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="logout-container">
      <h1 className="logout-username">{currentUser?.name || ''}</h1>
      <p className="logout-message">Are you sure you want to log out?</p>

      <div className="logout-buttons">
        <button className="logout-btn logout-confirm" onClick={handleLogout}>
          Log Out
        </button>
        <button className="logout-btn logout-cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
