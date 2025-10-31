import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';
import './ChooseUser.css'; // ✅ Import external CSS

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/districtLogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <div className="choose-container">
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <Paper className="choose-paper" elevation={3}>
                <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box>
                <h2 className="choose-title">Admin</h2>
                <p className="choose-desc">
                  Oversees all districts and manages submitted data efficiently.
                </p>
              </Paper>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Student")}>
              <Paper className="choose-paper" elevation={3}>
                <Box mb={2}>
                  <School fontSize="large" />
                </Box>
                <h2 className="choose-title">District</h2>
                <p className="choose-desc">
                  Provides and updates district-specific information for administrative review.
                </p>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default ChooseUser;
