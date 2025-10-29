import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Modal,
  Fade,
  Backdrop,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import { CalendarMonth, LocationOn, Close } from "@mui/icons-material";
import styled from "styled-components";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { useNavigate } from "react-router-dom";

const ShowStudents = () => {
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);
  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllStudents(adminID));
  }, [adminID, dispatch]);

  // ✅ Dynamically get district names from studentsList
  const districts = [
    ...new Set(studentsList?.map((student) => student.district).filter(Boolean)),
  ];

  const [openModal, setOpenModal] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const navigate = useNavigate();

const handleOpen = (district) => {
  navigate(`/districts/${encodeURIComponent(district)}`);
};

// 🟩 Fetch form data from backend
const fetchFormData = async (district, date) => {
  if (!district) return;
  setLoading(true);
  setError("");
  setFormData([]);

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/formdata/${district}?date=${date}`
    );

    if (!res.ok) throw new Error("Failed to fetch form data");

    const data = await res.json();
    console.log("Response:", data);

    if (data && data.length > 0) {
      setFormData(data); // ✅ now array directly
    } else {
      setFormData([]);
    }
  } catch (err) {
    console.error("❌ Error fetching form data:", err);
    setError("Unable to load data. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  // const handleOpen = (district) => {
  //   setSelectedDistrict(district);
  //   setOpenModal(true);
  //   fetchFormData(district, selectedDate);
  // };

  const handleClose = () => {
    setOpenModal(false);
    setFormData([]);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchFormData(selectedDistrict, date);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: "#002b5c",
          textAlign: "center",
        }}
      >
        📍 District Overview Dashboard
      </Typography>

      <Grid container spacing={3}>
        {districts.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              width: "100%",
              mt: 5,
              color: "gray",
            }}
          >
            ⚠️ No districts found yet in the database.
          </Typography>
        ) : (
          districts.map((district, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <StyledCard elevation={4} onClick={() => handleOpen(district)}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <LocationOn sx={{ fontSize: 40, color: "#0073e6", mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {district}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
                    Click to view reports
                  </Typography>
                </Box>
              </StyledCard>
            </Grid>
          ))
        )}
      </Grid>

      {/* 🟩 Modal for District Details */}
      <Modal
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "900px",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 3,
              p: 4,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#002b5c" }}>
                🏛️ {selectedDistrict} District Report
              </Typography>
              <Button onClick={handleClose}>
                <Close />
              </Button>
            </Box>

            {/* Date Filter */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
              gap={2}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <CalendarMonth sx={{ color: "#0073e6" }} />
                <TextField
                  type="date"
                  size="small"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                Showing data for: <b>{selectedDate}</b>
              </Typography>
            </Box>

            {/* Content */}
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={5}
              >
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
                {error}
              </Typography>
            ) : formData.length === 0 ? (
              <Typography sx={{ textAlign: "center", py: 4, color: "gray" }}>
                ⚠️ No form data found for this date.
              </Typography>
            ) : (
              <Box>
                {formData.map((form, idx) => (
  <Paper key={idx} sx={{ p: 2, mb: 2, borderLeft: "6px solid #0073e6", borderRadius: 2 }}>
    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
      {form.formName}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Entries: {form.totalEntries}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Date: {form.createdDate}
    </Typography>

    {/* ✅ Show inner fields */}
    <Box mt={1}>
      {form.formData && Object.entries(form.formData).map(([key, value]) => (
        <Typography key={key} variant="body2">
          <strong>{key}:</strong> {value?.toString()}
        </Typography>
      ))}
    </Box>
  </Paper>
))}

              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

// 🎨 Styled Components
const StyledCard = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 115, 230, 0.2);
  }
`;

// export default AdminHomePage;


export default ShowStudents;