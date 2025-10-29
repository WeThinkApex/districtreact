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
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { useNavigate } from "react-router-dom";
import "./AdminHomePage.css"; // ✅ Import external CSS

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);
  const adminID = currentUser._id;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllStudents(adminID));
  }, [adminID, dispatch]);

  const districts = [
    ...new Set(studentsList?.map((student) => student.district).filter(Boolean)),
  ];

  const [openModal, setOpenModal] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = (district) => {
    navigate(`/districts/${encodeURIComponent(district)}`);
  };

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
      setFormData(data.length ? data : []);
    } catch (err) {
      console.error("❌ Error fetching form data:", err);
      setError("Unable to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
        className="page-title"
      >
        📍 District Overview Dashboard
      </Typography>

      <Grid container spacing={3}>
        {districts.length === 0 ? (
          <Typography className="no-districts">
            ⚠️ No districts found yet in the database.
          </Typography>
        ) : (
          districts.map((district, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={4}
                className="district-card"
                onClick={() => handleOpen(district)}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <LocationOn className="district-icon" />
                  <Typography variant="h6" className="district-name">
                    {district}
                  </Typography>
                  <Typography variant="body2" className="district-text">
                    Click to view reports
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={openModal}>
          <Box className="modal-box">
            <Box className="modal-header">
              <Typography variant="h6" className="modal-title">
                🏛️ {selectedDistrict} District Report
              </Typography>
              <Button onClick={handleClose}>
                <Close />
              </Button>
            </Box>

            <Box className="date-filter">
              <Box display="flex" alignItems="center" gap={1}>
                <CalendarMonth className="calendar-icon" />
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

            {loading ? (
              <Box className="loading-box">
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" className="error-text">
                {error}
              </Typography>
            ) : formData.length === 0 ? (
              <Typography className="no-data-text">
                ⚠️ No form data found for this date.
              </Typography>
            ) : (
              <Box>
                {formData.map((form, idx) => (
                  <Paper key={idx} className="form-card">
                    <Typography variant="subtitle1" className="form-name">
                      {form.formName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Entries: {form.totalEntries}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Date: {form.createdDate}
                    </Typography>

                    <Box mt={1}>
                      {form.formData &&
                        Object.entries(form.formData).map(([key, value]) => (
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

export default AdminHomePage;