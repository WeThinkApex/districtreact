import React from "react";
import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity"; // ✅ New icon for Add Districts

const SidebarMenu = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Crime Data", path: "/form/crimeData" },
    { text: "Non-Bailable Warrants", path: "/form/nonbailableWarrants" },
    { text: "PD Act Proposals", path: "/form/actProposals" },
    { text: "Externment Actions", path: "/form/externmentActions" },
    { text: "Sensitive / Political", path: "/form/sensitivePoliticalCases" },
    { text: "VC Productions", path: "/form/vcProductions" },
    { text: "Important Cases", path: "/form/importantCases" },
    { text: "CCTV Surveillance", path: "/form/cctvSurveillance" },
    { text: "Cyber Crime Monitoring", path: "/form/cyberCrimeMonitoring" },
    { text: "Women’s Safety", path: "/form/womensSafety" },
    { text: "Focus Area", path: "/form/focusArea" },
    { text: "Legal Monitoring", path: "/form/legalMonitoring" },
    { text: "DSR Summary", path: "/form/dsrSummary" },
    { text: "Fertilizer Monitoring", path: "/form/fertilizerMonitoring" },
    { text: "All Districts", path: "/Admin/districts" },

  
  ];

  return (
    <>
      {/* Main Menu */}
      {menuItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path);
        return (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              pl: 3,
              py: 1.5,
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            {item.icon && (
              <ListItemIcon>
                {React.cloneElement(item.icon, {
                  color: isActive ? "primary" : "inherit",
                })}
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: "16px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "primary.main" : "text.primary",
              }}
            />
          </ListItemButton>
        );
      })}

      {/* Divider */}
      <Divider sx={{ my: 1 }} />

    

    
   
      {/* Logout */}
      <ListItemButton
        component={Link}
        to="/logout"
        sx={{
          pl: 3,
          py: 1.5,
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        <ListItemIcon>
          <ExitToAppIcon
            color={
              location.pathname.startsWith("/logout") ? "primary" : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          primaryTypographyProps={{
            fontSize: "16px",
            fontWeight: location.pathname.startsWith("/logout") ? 600 : 400,
            color: location.pathname.startsWith("/logout")
              ? "primary.main"
              : "text.primary",
          }}
        />
      </ListItemButton>
    </>
  );
};

export default SidebarMenu;
