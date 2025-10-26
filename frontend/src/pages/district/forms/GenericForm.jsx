import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { saveFormData } from "../../../redux/userRelated/formHandle";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { formsFields } from "../../config/formsFields";

const GenericForm = ({ formId, formTitle, handleDrawerClose }) => {
  const dispatch = useDispatch();
  const fields = formsFields[formId] || [];
  const [formRows, setFormRows] = useState([{ id: Date.now(), data: {} }]);
  const [message, setMessage] = useState("");

  const { studentsList } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [dispatch, currentUser._id]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setFormRows((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, data: { ...row.data, [name]: value } } : row
      )
    );
  };

  const handleAddRow = () => {
  setFormRows((prev) => [
    ...prev,
    { id: Date.now(), data: {}, expanded: true }, // 👈 add expanded flag
  ]);
};

  const handleClear = (index) => {
    setFormRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, data: {} } : row))
    );
  };

  const handleDeleteRow = (index) => {
    setFormRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
  setMessage("⏳ Saving data...");
  try {
    // filter out empty entries
    const validRows = formRows.filter((row) =>
      Object.values(row.data).some((val) => val && val.trim() !== "")
    );

    if (validRows.length === 0) {
      setMessage("⚠️ Please fill at least one field before saving.");
      return;
    }

    for (const row of validRows) {
      await dispatch(saveFormData(row.data, formId, currentUser));
    }

    localStorage.setItem(formTitle, JSON.stringify(validRows));
    setMessage("✅ Form saved successfully!");

    setTimeout(() => {
      setFormRows([{ id: Date.now(), data: {} }]);
      handleDrawerClose(); // Close modal after save
    }, 1000);
  } catch (err) {
    console.error(err);
    setMessage("❌ Failed to save form.");
  }
};


  return (
    <Box>
      {formRows.map((row, index) => (
        <Accordion
          key={row.id}
          defaultExpanded={index === 0 || row.expanded}
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
            borderRadius: "12px !important",
            mb: 2,
            "&:before": { display: "none" },
            "&:hover": { boxShadow: "0px 4px 10px rgba(0,0,0,0.12)" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#1976d2", fontSize: "1.8rem" }} />}
            sx={{
              backgroundColor: "#f0f4ff",
              borderRadius: "12px",
              "& .MuiTypography-root": {
                fontWeight: 600,
                color: "#0d47a1",
              },
            }}
          >
            <Typography>Entry {index + 1}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={2}>
              {fields.map((field) => (
                <Grid item xs={12} sm={3} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={row.data[field.name] || ""}
                    onChange={(e) => handleChange(index, e)}
                    size="small"
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>

            <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                onClick={() => handleClear(index)}
              >
                Clear
              </Button>

              <Button
                variant="outlined"
                color="error"
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                onClick={() => handleDeleteRow(index)}
              >
                🗑 Delete
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="success"
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          onClick={handleAddRow}
        >
          ➕ Add Entry
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
          }}
          onClick={handleSave}
        >
          💾 Save All
        </Button>
      </Box>

      {message && (
        <Typography
          mt={3}
          textAlign="center"
          sx={{
            color: message.includes("✅") ? "green" : message.includes("❌") ? "red" : "gray",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default GenericForm;
