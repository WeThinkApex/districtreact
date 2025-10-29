import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import Students from "../../assets/dsr-banner.jpg";
import { LightPurpleButton } from '../../components/buttonStyles';
import './Homepage.css'; // ✅ Import external CSS

const Homepage = () => {
  return (
    <Container className="homepage-container">
      <Grid
        container
        spacing={0}
        className="homepage-grid"
      >
        {/* ✅ Left Image Section */}
        <Grid item xs={12} md={6} className="homepage-image-section">
          <img src={Students} alt="students" className="homepage-image" />
        </Grid>

        {/* ✅ Right Text Section */}
        <Grid item xs={12} md={6} className="homepage-right-section">
          <Box className="homepage-content-box">
            <h1 className="homepage-title">
              Welcome to
              <br />
             AP Police - Daily Situation Report
              <br />
              System
            </h1>

            <p className="homepage-text">
              A unified system for seamless administration and transparent governance.
            </p>

            <Box className="homepage-button-box">
              <Link to="/choose" className="homepage-link">
                <LightPurpleButton variant="contained" fullWidth>
                  Login
                </LightPurpleButton>
              </Link>

              <p className="homepage-text">
                Don’t have an account?{' '}
                <Link to="/Adminregister" className="signup-link">
                  Sign up
                </Link>
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Homepage;
