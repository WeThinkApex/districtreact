import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { formsFields } from "../../config/formsFields"; // ✅ import your shared config

const GenericForm = ({ formId, formTitle }) => {
  // Use fields from your formsFields.js file
  const fields = formsFields[formTitle] || [];
  const [formData, setFormData] = useState({});

  // 🧠 Load saved data when form changes
  useEffect(() => {
    const savedData = localStorage.getItem(formTitle);
    if (savedData) setFormData(JSON.parse(savedData));
  }, [formTitle]);

  // 🖊️ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 Save to localStorage
  const handleSave = () => {
    localStorage.setItem(formTitle, JSON.stringify(formData));
    alert("✅ Data saved locally for " + formTitle);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography
        variant="subtitle1"
        sx={{ mb: 2, color: "#333", fontWeight: 500 }}
      >
        Fill the required details for{" "}
        <span style={{ color: "#002b5c", fontWeight: 600 }}>
          {formTitle}
        </span>
      </Typography>

      {fields.length === 0 ? (
        <Typography color="error" sx={{ fontWeight: 500 }}>
          ⚠️ No fields found for this form. Please check your formsFields.js.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputLabelProps={
                  field.type === "date" ? { shrink: true } : undefined
                }
                InputProps={{
                  sx: { backgroundColor: "#fff", borderRadius: 2 },
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3, textTransform: "none", borderRadius: 2 }}
        onClick={handleSave}
      >
        💾 Save Form
      </Button>
    </Box>
  );
};

export default GenericForm;
