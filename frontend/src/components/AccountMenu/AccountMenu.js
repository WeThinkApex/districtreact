import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Paper,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AccountMenu.css'; // Import the CSS file

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { currentRole, currentUser } = useSelector((state) => state.user);
console.log("rola en discy",currentUser)
console.log("role",currentRole)
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 34, height: 34, bgcolor: '#002b5c' }}>
              {String(currentUser.name || 'U').charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: styles.styledPaper,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* --- User Info Card --- */}
       <Paper
  elevation={0}
  sx={{
    px: 2.5,
    py: 2,
    backgroundColor: '#f9fbfd',
    borderRadius: 2,
    minWidth: 240,
  }}
>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
    <Avatar
      sx={{
        width: 50,
        height: 50,
        bgcolor: '#002b5c',
        fontSize: '1.1rem',
        fontWeight: 600,
      }}
    >
      {String(
        currentRole === 'District'
          ? currentUser.district || 'D'
          : currentUser.name || 'U'
      )
        .charAt(0)
        .toUpperCase()}
    </Avatar>

    <Box>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: '#002b5c',
          lineHeight: 1.3,
        }}
      >
        {currentRole === 'District'
          ? currentUser.district || 'District'
          : currentUser.name || 'User Name'}
      </Typography>

      {/* Show email only for admin */}
      {currentRole === 'admin' && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mt: 0.3,
            fontSize: '0.9rem',
          }}
        >
          {currentUser.email || 'user@email.com'}
        </Typography>
      )}
    </Box>
  </Box>
</Paper>

<Divider sx={{ my: 1 }} />

<MenuItem component={Link} to="/logout">
  <ListItemIcon>
    <Logout fontSize="small" sx={{ color: '#002b5c' }} />
  </ListItemIcon>
  <Typography variant="body2" sx={{ fontWeight: 500 }}>
    Logout
  </Typography>
</MenuItem>



       
      </Menu>
    </>
  );
};

export default AccountMenu;

const styles = {
  styledPaper: {
    overflow: 'visible',
    borderRadius: 3,
    mt: 1.5,
    p: 0,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 18,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};
