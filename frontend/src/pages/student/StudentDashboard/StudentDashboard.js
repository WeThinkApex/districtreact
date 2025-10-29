import { CssBaseline, Box, Toolbar, Typography } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import StudentHomePage from '../StudentHomePage';
import StudentProfile from '../StudentProfile';
import StudentSubjects from '../StudentSubjects';
import ViewStdAttendance from '../ViewStdAttendance/ViewStdAttendance';
import StudentComplain from '../../student/StudentComplain/StudentComplain';
import Logout from '../../Logout/Logout';
import AccountMenu from '../../../components/AccountMenu/AccountMenu';
import { AppBar } from '../../../components/styles';
import './StudentDashboard.css'; // <-- CSS import

const StudentDashboard = () => {
    return (
        <div className="dashboard-container">
            <CssBaseline />
            <AppBar position="absolute" className="dashboard-appbar">
                <Toolbar className="dashboard-toolbar">
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className="dashboard-title"
                    >
                        District Dashboard
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </AppBar>

            <Box component="main" className="dashboard-main">
                <Toolbar />
                <Routes>
                    <Route path="/" element={<StudentHomePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/Student/dashboard" element={<StudentHomePage />} />
                    <Route path="/Student/profile" element={<StudentProfile />} />
                    <Route path="/Student/subjects" element={<StudentSubjects />} />
                    <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                    <Route path="/Student/complain" element={<StudentComplain />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Box>
        </div>
    );
};

export default StudentDashboard;
