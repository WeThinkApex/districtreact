import React, { useState, useEffect } from "react";
import { Typography, Container, Paper, Button, Box } from "@mui/material";
import styled from "styled-components";
import DistrictNoticeForm from "../district/forms/DistrictNoticeForm";

// 🚀 Step 1: (Later you will create these 3 forms separately)
// import AddSchoolForm from "../../components/forms/AddSchoolForm";
// import AddNoticeForm from "../../components/forms/AddNoticeForm";
// import AddEventForm from "../../components/forms/AddEventForm";
// import UploadReportForm from "../../components/forms/UploadReportForm";

const StudentHomePage = () => {
  const [selectedForm, setSelectedForm] = useState("");

  // Debug current user (if needed)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    console.log("Current District User:", currentUser);
  }, [currentUser]);

  
const handleNoticeSubmit = (data) => {
  console.log("Notice submitted from dashboard:", data);
  // TODO: send this data to your backend API
};

  // 🧠 Logic: render form based on button clicked
  const renderForm = () => {
    switch (selectedForm) {
    //   case "school":
    //     return <AddSchoolForm />;
case "notice":
  return <DistrictNoticeForm onSuccess={() => setSelectedForm("")} />;
 
 //   case "event":
    //     return <AddEventForm />;
    //   case "report":
    //     return <UploadReportForm />;
      default:
        return (
          <Typography variant="h5" sx={{ textAlign: "center", mt: 3 }}>
  Please select a form to get started.
</Typography>

        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#2c3e50" }}>
        🏛️ District Dashboard
      </Typography>

      {/* Button Section */}
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2 }}>
        <Button variant="contained" onClick={() => setSelectedForm("school")} color="primary">
          Add School
        </Button>
        <Button variant="contained" onClick={() => setSelectedForm("notice")} color="secondary">
          Add Notice
        </Button>
        <Button variant="contained" onClick={() => setSelectedForm("event")} color="success">
          Add Event
        </Button>
        <Button variant="contained" onClick={() => setSelectedForm("report")} color="info">
          Upload Report
        </Button>
      </Box>

      {/* Form Section */}
      <StyledPaper elevation={3}>
        {renderForm()}
      </StyledPaper>
    </Container>
  );
};

// 🎨 Styling
const StyledPaper = styled(Paper)`
  padding: 24px;
  margin-top: 32px;
  border-radius: 16px;
  min-height: 300px;
  background-color: #f9f9f9;
`;

export default StudentHomePage;
