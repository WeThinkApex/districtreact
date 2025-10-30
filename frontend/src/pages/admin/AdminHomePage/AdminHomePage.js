import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Toolbar,
  CssBaseline,
  AppBar,
  Tooltip,
} from "@mui/material";
import { formsFields } from "../../config/formsFields";
import { formsConfig } from "../../config/formsConfig";
import AccountMenu from "../../../components/AccountMenu/AccountMenu";

const AdminHomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formKey = "crimeData"; // Default form to load
  const formInfo = formsConfig.find((f) => f.id === formKey);
  const formTitle = formInfo ? formInfo.title : "Crime Data";
  const fields = formsFields[formKey] || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/formdata/form/${formKey}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [formKey]);

  // Group by district
  const groupedData = data.reduce((acc, item) => {
    const district = item.createdBy || "Unknown District";
    if (!acc[district]) acc[district] = [];
    acc[district].push(item);
    return acc;
  }, {});

  // Flatten all district data
  const allEntries = Object.entries(groupedData).flatMap(([district, items]) =>
    items.map((entry) => ({ ...entry, district }))
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" sx={{ backgroundColor: "#002b5c" }}>
        <Toolbar sx={{ pr: "24px" }}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            District Dashboard – {formTitle}
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          backgroundColor: "#f4f6f9",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          paddingBottom: "40px",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 3, color: "#002b5c", fontWeight: 700 }}
          >
            🏛️ Andhra Pradesh Police – {formTitle} Overview
          </Typography>

        {loading ? (
  <Box display="flex" justifyContent="center" py={5}>
    <CircularProgress />
  </Box>
) : error ? (
  <Typography align="center" color="error">
    {error}
  </Typography>
) : data.length === 0 ? (
  <Typography align="center" color="textSecondary">
    No records found.
  </Typography>
) : (
  <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
    <TableContainer>
      <Table>
        {/* Header Row */}
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: "#002b5c",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                textAlign: "center",
                borderRight: "1px solid #1a3e72",
              }}
            >
              District
            </TableCell>
            {fields.map((f) => (
              <TableCell
                key={f.name}
                sx={{
                  backgroundColor: "#f3f8ff",
                  color: "#002b5c",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderBottom: "2px solid #dee3eb",
                  textTransform: "capitalize",
                }}
              >
                {f.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {allEntries.map((entry, idx) => (
            <TableRow
              key={entry._id || idx}
              hover
              sx={{
                backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f9fcff",
              }}
            >
              <TableCell
                sx={{
                  borderRight: "2px solid #002b5c",
                  fontWeight: 600,
                  color: "#002b5c",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  width: "180px",
                }}
              >
                {entry.district}
              </TableCell>
              {fields.map((f) => {
                const text = entry.formData?.[f.name] || "-";
                return (
                  <TableCell
                    key={`${entry._id}-${f.name}`}
                    sx={{
                      borderBottom: "1px solid #e0e0e0",
                      color: "#333",
                      fontSize: "0.95rem",
                    }}
                  >
                    <Tooltip
                      title={
                        text && text !== "-" ? (
                          <span style={{ whiteSpace: "pre-line" }}>{text}</span>
                        ) : (
                          ""
                        )
                      }
                      arrow
                      placement="top-start"
                    >
                      <span>{text}</span>
                    </Tooltip>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
)}

        </Container>
      </Box>
    </Box>
  );
};

export default AdminHomePage;