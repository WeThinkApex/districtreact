import * as React from 'react';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  List,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import "./SideBar.css"; // ✅ Import CSS file

const SideBar = () => {
  const location = useLocation();

  // Helper to check active link
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="sidebar-container">
      <List component="nav" disablePadding>

        {/* 🏠 Home */}
        <ListItemButton
          component={Link}
          to="/"
          className={isActive("/") ? "active-link" : ""}
        >
          <ListItemIcon>
            <HomeIcon color={isActive("/") ? "primary" : "inherit"} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        {/* 👥 Districts */}
        <ListItemButton
          component={Link}
          to="/Admin/students"
          className={isActive("/Admin/students") ? "active-link" : ""}
        >
          <ListItemIcon>
            <PersonOutlineIcon color={isActive("/Admin/students") ? "primary" : "inherit"} />
          </ListItemIcon>
          <ListItemText primary="Districts" />
        </ListItemButton>

        {/* 📢 Notices */}
        <ListItemButton
          component={Link}
          to="/Admin/notices"
          className={isActive("/Admin/notices") ? "active-link" : ""}
        >
          <ListItemIcon>
            <AnnouncementOutlinedIcon color={isActive("/Admin/notices") ? "primary" : "inherit"} />
          </ListItemIcon>
          <ListItemText primary="Notices" />
        </ListItemButton>

        <Divider sx={{ my: 1 }} />

        {/* 👤 User Section */}
        <ListSubheader component="div" inset className="sidebar-subheader">
          User
        </ListSubheader>

        {/* Profile */}
        <ListItemButton
          component={Link}
          to="/Admin/profile"
          className={isActive("/Admin/profile") ? "active-link" : ""}
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon color={isActive("/Admin/profile") ? "primary" : "inherit"} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        {/* Logout */}
        <ListItemButton
          component={Link}
          to="/logout"
          className={isActive("/logout") ? "active-link" : ""}
        >
          <ListItemIcon>
            <ExitToAppIcon color={isActive("/logout") ? "primary" : "inherit"} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>

      </List>
    </div>
  );
};

export default SideBar;
