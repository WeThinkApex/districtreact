import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Grid, Box, Typography, Paper, Checkbox,
  FormControlLabel, TextField, CssBaseline, IconButton,
  InputAdornment, CircularProgress, Backdrop
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/login-slide.jpg";
import { LightPurpleButton } from '../../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';
import './LoginPage.css'; // ✅ External CSS

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === "Student") {
      const rollNum = event.target.rollNumber.value;
      const password = event.target.password.value;
      if (!rollNum || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fields = { district: rollNum, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;
      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'rollNumber') setRollNumberError(false);
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') navigate('/Admin/dashboard');
      else if (currentRole === 'Student') navigate('/Student/dashboard');
      else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" className="login-container">
        <CssBaseline />

        {/* Left Login Form */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="login-left-section">
          <Box className="login-box">
            <Typography variant="h4" className="login-title">
              {role === "Student" ? "District" : role} Login
            </Typography>
            <Typography variant="subtitle1" className="login-subtitle">
              Welcome back! Please enter your details
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} className="login-form">
              {role === "Student" ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="rollNumber"
                  label="Enter your District Name"
                  name="rollNumber"
                  autoComplete="off"
                  autoFocus
                  error={rollNumberError}
                  helperText={rollNumberError && 'District is required'}
                  onChange={handleInputChange}
                />
              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter your email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={emailError}
                  helperText={emailError && 'Email is required'}
                  onChange={handleInputChange}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError && 'Password is required'}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Grid container className="login-options">
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <StyledLink href="#">Forgot password?</StyledLink>
              </Grid>

              <LightPurpleButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </LightPurpleButton>

              {role === "Admin" && (
                <Grid container className="signup-section">
                  <Grid>Don't have an account?</Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <StyledLink to="/Adminregister">Sign up</StyledLink>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Right Image Section */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className="login-right-section"
          style={{ backgroundImage: `url(${bgpic})` }}
        />
      </Grid>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={guestLoader}>
        <CircularProgress color="primary" />
        Please Wait
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </ThemeProvider>
  );
};

export default LoginPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
