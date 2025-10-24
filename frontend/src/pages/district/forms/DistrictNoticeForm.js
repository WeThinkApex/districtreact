import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle"; // or registerUser if you want
import Popup from "../../../components/Popup";
import { underControl } from '../../../redux/userRelated/userSlice';

import { CircularProgress, Paper, Grid, TextField, Button, Typography } from "@mui/material";
const DistrictNoticeForm = ({ onSuccess }) => {
  const dispatch = useDispatch();

  // Redux state
  const userState = useSelector((state) => state.user);
  const { status, response, currentUser } = userState;
useEffect(() => {
  // reset redux status on mount
  dispatch(underControl());
}, [dispatch]);
  // Form state
  const [title, setNoticeTitle] = useState("");
  const [date, setNoticeDate] = useState("");
  const [details, setNoticeDescription] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [loader, setLoader] = useState(false);

  // Popup
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setLoader(true);

    const fields = {
      title,
      date,
      details,
      issuedBy,
      adminID: currentUser?._id || null,
    };
  const address = "Notice"
   dispatch(addStuff(fields, "Notice")); 
  };

  
 useEffect(() => {
  if (status === "added" || status === "success") {
    setLoader(false);
    setNoticeTitle("");
    setNoticeDate("");
    setNoticeDescription("");
    setIssuedBy("");
    setMessage("Notice submitted successfully!");
    setShowPopup(true);

    if (onSuccess) {
      setTimeout(() => {
        onSuccess();
        setShowPopup(false);
      }, 1000);
    }

    dispatch(underControl()); // ✅ safe here
  } else if (status === "failed" || status === "error") {
    setLoader(false);
    setMessage(response || "Something went wrong!");
    setShowPopup(true);
  }
}, [status, response, onSuccess, dispatch]);


  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          maxWidth: 600,
          margin: "0 auto",
          mt: 3,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          📝 District Notice Form
        </Typography>

        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Notice Title"
                value={title}
                onChange={(e) => setNoticeTitle(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setNoticeDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Notice Description"
                value={details}
                onChange={(e) => setNoticeDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Issued By"
                value={issuedBy}
                onChange={(e) => setIssuedBy(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, px: 4, py: 1, borderRadius: 2, fontWeight: "bold" }}
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit Notice"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default DistrictNoticeForm;
