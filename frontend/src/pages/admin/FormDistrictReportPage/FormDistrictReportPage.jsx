import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { formsFields } from "../../config/formsFields";
import { formsConfig } from "../../config/formsConfig";
import "./FormDistrictReportPage.css";

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

  // Flatten all district data into one array
  const allEntries = Object.entries(groupedData).flatMap(([district, items]) =>
    items.map((entry) => ({ ...entry, district }))
  );

  return (
    <Container maxWidth="xl" className="report-container">
      {/* Page Title */}
      <Typography
        variant="h4"
        className="report-title"
        sx={{
          mb: 3,
          fontWeight: 800,
          color: "#002b5c",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {formTitle} - All Districts
      </Typography>

      {/* Combined Table with Single Header */}
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
                  {/* District (left side) */}
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

                  {/* Other fields */}
                  {fields.map((f) => {
                    const text = entry.formData?.[f.name] || "-";
                    return (
                      <TableCell
                        key={f.name}
                        sx={{
                          borderBottom: "1px solid #e0e0e0",
                          color: "#333",
                          fontSize: "0.95rem",
                        }}
                      >
                        <Tooltip
                          title={
                            text && text !== "-" ? (
                              <span className="tooltip-text">{text}</span>
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
    </Container>
  );
};

export default FormDistrictReportPage;
