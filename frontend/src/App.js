import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import DistrictDashboard from './pages/district/forms/districtDashboard'
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser/ChooseUser';

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/districtLogin" element={<LoginPage role="District" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>}

      {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
      }

      {currentRole === "District" &&
        <>
          <DistrictDashboard />
        </>
      }

      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      }
    </Router>
  )
}

export default App