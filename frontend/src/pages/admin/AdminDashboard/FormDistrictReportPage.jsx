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
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { formsFields } from "../../config/formsFields";
import { formsConfig } from "../../config/formsConfig";

const FormDistrictReportPage = () => {
  const { formKey } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formInfo = formsConfig.find((f) => f.id === formKey);
  const formTitle = formInfo ? formInfo.title : formKey;

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
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [formKey]);

  const fields = formsFields[formKey] || [];

  // Group data by district
  const groupedData = data.reduce((acc, item) => {
    const district = item.createdBy || "Unknown District";
    if (!acc[district]) acc[district] = [];
    acc[district].push(item);
    return acc;
  }, {});

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      {/* Main Page Header */}
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#002b5c",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {formTitle} — All Districts
      </Typography>

      {/* Loading / Error / Empty State */}
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
        Object.keys(groupedData).map((district) => (
          <Paper
            key={district}
            elevation={4}
            sx={{
              mb: 5,
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* District Header */}
            <Box
              sx={{
                backgroundColor: "#002b5c",
                color: "white",
                py: 1.5,
                px: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              🏛️ {district}
            </Box>

            {/* District Table */}
            <TableContainer component={Box}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#e9f1fb" }}>
                    {fields.map((f) => (
                      <TableCell
                        key={f.name}
                        sx={{
                          fontWeight: 700,
                          color: "#002b5c",
                          borderBottom: "2px solid #cfd8dc",
                        }}
                      >
                        {f.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedData[district].map((entry) => (
                    <TableRow key={entry._id} hover>
                      {fields.map((f) => {
                        const text = entry.formData?.[f.name] || "-";
                        return (
                          <TableCell
                            key={f.name}
                            sx={{
                              verticalAlign: "top",
                              borderBottom: "1px solid #eee",
                              maxWidth: 220,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <Tooltip
  title={
    text && text !== "-" ? (
      <span
        style={{
          whiteSpace: "pre-line",
          fontSize: "1rem",          // 👈 Larger text
          fontWeight: 500,           // 👈 Slightly bolder
          lineHeight: 1.5,
          maxWidth: "400px",         // 👈 Wider tooltip
          display: "block",
          wordBreak: "break-word",
        }}
      >
        {text}
      </span>
    ) : (
      ""
    )
  }
  arrow
  placement="top-start"
  componentsProps={{
    tooltip: {
      sx: {
        backgroundColor: "#f5f5f5", // light background
        color: "#111",
        boxShadow: 3,
        borderRadius: 2,
        p: 1.5,
      },
    },
  }}
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
        ))
      )}
    </Container>
  );
};

export default FormDistrictReportPage;
