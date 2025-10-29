// Import necessary modules and libraries
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Button, Collapse } from '@mui/material';
import { deleteUser, updateUser } from '../../../redux/userRelated/userHandle';
import { authLogout } from '../../../redux/userRelated/userSlice';
import { useNavigate } from 'react-router-dom';
import './AdminProfile.css';

const AdminProfile = () => {
    // Access current user data from Redux store
    const { currentUser } = useSelector((state) => state.user);

    // Local state for showing/hiding the edit form
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit profile';

    // Input field states
    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [password, setPassword] = useState('');
    const [schoolName, setSchoolName] = useState(currentUser?.schoolName || '');

    // Redux and navigation setup
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Prepare data for update
    const fields = password === ""
        ? { name, email, schoolName }
        : { name, email, password, schoolName };

    // Submit handler for updating user details
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, currentUser._id, "Admin"));
    };

    // Delete user handler
    const deleteHandler = () => {
        try {
            dispatch(deleteUser(currentUser._id, "Students"));
            dispatch(deleteUser(currentUser._id, "Admin"));
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="admin-profile-container">
            {/* Display admin basic info */}
            <div className="profile-info">
                <h2>Admin Profile</h2>
                <p><strong>Name:</strong> {currentUser?.name}</p>
                <p><strong>Email:</strong> {currentUser?.email}</p>
                <p><strong>School:</strong> {currentUser?.schoolName}</p>
            </div>

            {/* Buttons for edit and delete actions */}
            <div className="profile-actions">
                <Button
                    variant="contained"
                    color="error"
                    onClick={deleteHandler}
                    className="delete-btn"
                >
                    Delete
                </Button>

                <Button
                    variant="contained"
                    className="edit-btn"
                    onClick={() => setShowTab(!showTab)}
                >
                    {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    {buttonText}
                </Button>
            </div>

            {/* Edit profile section (toggle collapse) */}
            <Collapse in={showTab} timeout="auto" unmountOnExit>
                <div className="register">
                    <form className="registerForm" onSubmit={submitHandler}>
                        <span className="registerTitle">Edit Details</span>

                        {/* Name Field */}
                        <label>Name</label>
                        <input
                            className="registerInput"
                            type="text"
                            placeholder="Enter your name..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name"
                            required
                        />

                        {/* School Field */}
                        <label>School</label>
                        <input
                            className="registerInput"
                            type="text"
                            placeholder="Enter your school name..."
                            value={schoolName}
                            onChange={(event) => setSchoolName(event.target.value)}
                            autoComplete="organization"
                            required
                        />

                        {/* Email Field */}
                        <label>Email</label>
                        <input
                            className="registerInput"
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email"
                            required
                        />

                        {/* Password Field */}
                        <label>Password</label>
                        <input
                            className="registerInput"
                            type="password"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password"
                        />

                        {/* Submit Button */}
                        <button className="registerButton" type="submit">
                            Update
                        </button>
                    </form>
                </div>
            </Collapse>
        </div>
    );
};

export default AdminProfile;

/*
====================================
Inline Styles (Old Reference)
====================================
const styles = {
    attendanceButton: {
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    }
}
*/
