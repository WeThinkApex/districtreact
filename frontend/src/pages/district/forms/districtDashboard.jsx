import React, { useState, useEffect } from "react";
import GenericForm from "./GenericForm";
import { formsFields } from "../../config/formsFields";
import CloseIcon from "@mui/icons-material/Close";
import {
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  Box,
  Toolbar,
  CssBaseline,
  AppBar,
  Drawer,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import { formsConfig } from "../../config/formsConfig";
import AccountMenu from "../../../components/AccountMenu";
import Logout from "../../Logout";

const DistrictDashboard = () => {
  const [selectedForm, setSelectedForm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    districtName: "Guntur",
  };

  useEffect(() => {
    console.log("Current District User:", currentUser);
  }, [currentUser]);

  const handleFormClick = (form) => {
    setSelectedForm(form.title);
    setActiveForm(form);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setActiveForm(null);
  };

  // Filter only 14 forms (in case 15 & 16 exist)
  const filteredForms = formsConfig.slice(0, 14);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* 🔹 Top AppBar */}
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
              <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
                {/* Header */}
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1,
                    textAlign: "center",
                    color: "#002b5c",
                    fontWeight: 700,
                  }}
                >
                  🏛️ Andhra Pradesh Police – DSR Portal
                </Typography>

                <Typography
                  variant="h6"
                  align="center"
                  sx={{ mb: 5, color: "#555", fontWeight: 500 }}
                >
                  Welcome to{" "}
                  <span style={{ color: "#003366", fontWeight: 700 }}>
                    {currentUser?.districtName || "Your District"}
                  </span>{" "}
                  District 👮‍♂️
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

                {/* Info Box */}
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

                {/* 🔹 Drawer for Form */}
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={handleDrawerClose}
                  PaperProps={{
                    sx: {
                      width: { xs: "100%", sm: 500 },
                      p: 3,
                      backgroundColor: "#fafafa",
                    },
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#002b5c" }}
                    >
                      {activeForm?.title || "Form"}
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  {activeForm && (
                  <GenericForm
  formTitle={activeForm.title}
  fields={formsFields[activeForm.title] || []}
/>
                  )}
                </Drawer>
              </Container>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/logout" element={<Logout />} />
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

const StyledPaper = styled(Paper)`
  padding: 24px;
  margin-top: 40px;
  border-radius: 16px;
  background-color: #f9f9f9;
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

export default DistrictDashboard;
