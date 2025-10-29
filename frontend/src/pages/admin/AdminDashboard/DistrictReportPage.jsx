import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { formsConfig } from "../../config/formsConfig";
import { formsFields } from "../../config/formsFields";

const DistrictReportPage = () => {
  const { districtName } = useParams();
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch form data
  const fetchFormData = async (district, date) => {
    setLoading(true);
    setError("");
    setFormData([]);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/formdata/${district}?date=${date}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setFormData(data);
    } catch (err) {
      console.error("Error fetching form data:", err);
      setError("Unable to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormData(districtName, selectedDate);
  }, [districtName, selectedDate]);

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const getLabel = (formKey, fieldName) => {
    const formFields = formsFields[formKey];
    const field = formFields?.find((fld) => fld.name === fieldName);
    return field ? field.label : fieldName;
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#2F3E46" }}>
          📋 {districtName} District – Daily Report
        </Typography>
        <TextField
          type="date"
          size="small"
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
      </Box>

      {/* Loading / Error / No Data */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" sx={{ py: 4 }}>
          {error}
        </Typography>
      ) : formData.length === 0 ? (
        <Typography align="center" color="textSecondary" sx={{ py: 4 }}>
          ⚠️ No form data found for this date.
        </Typography>
      ) : (
        <>
          {formsConfig.map(({ id, title }) => {
            const form = formData.find((f) => f.formKey === id);
            if (!form) return null;

            return form.entries.map((entry, index) => (
              <Box key={entry.id} mb={5}>
                {/* Section Header */}
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    py: 1.2,
                    px: 2,
                    borderRadius: "8px 8px 0 0",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                  }}
                >
                  {title} {form.entries.length > 1 ? `(${index + 1})` : ""}
                </Typography>

                {/* Table */}
                <TableContainer
                  component={Paper}
                  sx={{
                    borderRadius: "0 0 8px 8px",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                    overflowX: "auto",
                  }}
                >
                  <Table size="small">
                    <TableHead
                      sx={{
                        backgroundColor: "#F4F6F8",
                        borderBottom: "2px solid #D3D9DE",
                      }}
                    >
                      <TableRow>
                        {Object.keys(entry.formData || {}).map((key) => (
                          <TableCell
                            key={key}
                            sx={{
                              fontWeight: 700,
                              color: "#2F3E46",
                              fontSize: "0.9rem",
                              borderRight: "1px solid #E0E0E0",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {getLabel(id, key)}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow
                        sx={{
                          backgroundColor: "#fff",
                          "&:hover": { backgroundColor: "#FAFAFA" },
                        }}
                      >
                        {Object.entries(entry.formData || {}).map(([key, value]) => (
                          <TableCell
                            key={key}
                            sx={{
                              borderRight: "1px solid #E0E0E0",
                              borderBottom: "1px solid #E0E0E0",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {value?.toString() || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ));
          })}
        </>
      )}
    </Container>
  );
};

export default DistrictReportPage;
