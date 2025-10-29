import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  Toolbar,
  CssBaseline,
  AppBar,
  Button,
} from "@mui/material";
import styled from "styled-components";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formsConfig } from "../../config/formsConfig";
import AccountMenu from "../../../components/AccountMenu/AccountMenu";
import Logout from "../../Logout/Logout";

const AdminHomePage = () => {
  const [selectedForm, setSelectedForm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current District User:", currentUser);
  }, [currentUser]);

  // ✅ When user clicks a form button, go to its dedicated page
  const handleFormClick = (form) => {
    setSelectedForm(form.title);
    navigate(`/form/${form.id}`);
  };

  // ✅ Only first 14 forms are shown as per your design
  const filteredForms = formsConfig.slice(0, 14);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* 🔹 Top Bar */}
      <AppBar position="absolute" sx={{ backgroundColor: "#002b5c" }}>
        <Toolbar sx={{ pr: "24px" }}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            District Dashboard
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>

      {/* 🔹 Main Content */}
      <Box component="main" sx={styles.boxStyled}>
        <Toolbar />
        <Routes>
          <Route
            path="/"
            element={
              <Container maxWidth="lg" sx={{ mt: 1, mb: 5 }}>
                {/* Header */}
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    textAlign: "center",
                    color: "#002b5c",
                    fontWeight: 700,
                  }}
                >
                  🏛️ Andhra Pradesh Police – DSR Portal
                </Typography>

                {/* Buttons Grid */}
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  alignItems="stretch"
                >
                  {filteredForms.map((form, index) => (
                    <Grid item xs={12} sm={6} md={3} key={form.id}>
                      <StyledButton
                        color={colorCycle[index % colorCycle.length]}
                        variant="contained"
                        fullWidth
                        onClick={() => handleFormClick(form)}
                      >
                        {form.title}
                      </StyledButton>
                    </Grid>
                  ))}
                </Grid>

                {/* Info Section */}
                <StyledPaper elevation={3}>
                  {selectedForm ? (
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        color: "#1a237e",
                        fontWeight: 600,
                      }}
                    >
                      You selected: {selectedForm}
                    </Typography>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", color: "#6c757d" }}
                    >
                      Please select a form to get started.
                    </Typography>
                  )}
                </StyledPaper>
              </Container>
            }
          />
          {/* Logout Route */}
          <Route path="/logout" element={<Logout />} />
          {/* Redirect any invalid routes back to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
};

/* 🎨 Styled Components */
const StyledButton = styled(Button)`
  padding: 16px 10px !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  font-size: 14.5px !important;
  height: 80px;
  transition: all 0.25s ease-in-out !important;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  }
`;

const StyledPaper = styled(Box)`
  padding: 24px;
  margin-top: 40px;
  border-radius: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

/* 🌈 Button Colors */
const colorCycle = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
];

/* 💅 Styles */
const styles = {
  boxStyled: {
    backgroundColor: "#f4f6f9",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    paddingBottom: "40px",
  },
};

export default AdminHomePage;
