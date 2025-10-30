import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AppBar, Drawer } from "../../../components/styles";
import Logout from "../../Logout/Logout";
import SideBar from "../SideBar/SideBar";
import AdminProfile from "../AdminProfile/AdminProfile";
import AdminHomePage from "../AdminHomePage/AdminHomePage";
import DistrictReportPage from "../AdminDashboard/DistrictReportPage";
import FormDistrictReportPage from "../FormDistrictReportPage/FormDistrictReportPage";
import AddStudent from "../studentRelated/AddStudent";
import SeeComplains from "../studentRelated/SeeComplains";
import ShowStudents from "../studentRelated/ShowStudents";
import StudentAttendance from "../studentRelated/StudentAttendance";
import StudentExamMarks from "../studentRelated/StudentExamMarks";
import ViewStudent from "../studentRelated/ViewStudent";

import AddNotice from "../noticeRelated/AddNotice";
import ShowNotices from "../noticeRelated/ShowNotices";

import ShowSubjects from "../subjectRelated/ShowSubjects";
import SubjectForm from "../subjectRelated/SubjectForm";
import ViewSubject from "../subjectRelated/ViewSubject";

import AddTeacher from "../teacherRelated/AddTeacher";
import ChooseClass from "../teacherRelated/ChooseClass";
import ChooseSubject from "../teacherRelated/ChooseSubject";
import ShowTeachers from "../teacherRelated/ShowTeachers";
import TeacherDetails from "../teacherRelated/TeacherDetails";

import AddClass from "../classRelated/AddClass";
import ClassDetails from "../classRelated/ClassDetails";
import ShowClasses from "../classRelated/ShowClasses";
import AccountMenu from "../../../components/AccountMenu/AccountMenu";

import "../AdminDashboard/AdminDashboard.css"; // ✅ Import external CSS

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);

  return (
    <div className="admin-dashboard-container">
      <CssBaseline />
      <AppBar
        className={`admin-appbar ${open ? "open" : ""}`}
        position="absolute"
      >
        
        <Toolbar className="toolbar-style">
          
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={`menu-button ${open ? "hide" : ""}`}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className="appbar-title"
          >
            Admin Dashboard
          </Typography>

          <AccountMenu />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={open ? "drawer-open" : "drawer-close"}
      >
        <Toolbar className="toolbar-style">
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <SideBar />
        </List>
      </Drawer>

      <Box className="main-box">
        <Toolbar />
        <Routes>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/Admin/dashboard" element={<AdminHomePage />} />
          <Route path="/Admin/profile" element={<AdminProfile />} />
          <Route path="/Admin/complains" element={<SeeComplains />} />
          <Route
            path="/districts/:districtName"
            element={<DistrictReportPage />}
          />
          <Route path="/form/:formKey" element={<FormDistrictReportPage />} />
          {/* Notice */}
          {/* <Route path="/Admin/addnotice" element={<AddNotice />} /> */}
          {/* <Route path="/Admin/notices" element={<ShowNotices />} /> */}

          {/* Subject */}
          <Route path="/Admin/subjects" element={<ShowSubjects />} />
          <Route
            path="/Admin/subjects/subject/:classID/:subjectID"
            element={<ViewSubject />}
          />
          <Route
            path="/Admin/subjects/chooseclass"
            element={<ChooseClass situation="Subject" />}
          />
          <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
          <Route
            path="/Admin/class/subject/:classID/:subjectID"
            element={<ViewSubject />}
          />
          <Route
            path="/Admin/subject/student/attendance/:studentID/:subjectID"
            element={<StudentAttendance situation="Subject" />}
          />
          <Route
            path="/Admin/subject/student/marks/:studentID/:subjectID"
            element={<StudentExamMarks situation="Subject" />}
          />

          {/* Class */}
          <Route path="/Admin/addclass" element={<AddClass />} />
          <Route path="/Admin/classes" element={<ShowClasses />} />
          <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
          <Route
            path="/Admin/class/addstudents/:id"
            element={<AddStudent situation="Class" />}
          />

          {/* Student */}
          <Route
            path="/Admin/addstudents"
            element={<AddStudent situation="Student" />}
          />
          <Route path="/Admin/districts" element={<ShowStudents />} />
          <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
          <Route
            path="/Admin/students/student/attendance/:id"
            element={<StudentAttendance situation="Student" />}
          />
          <Route
            path="/Admin/students/student/marks/:id"
            element={<StudentExamMarks situation="Student" />}
          />

          {/* Teacher */}
          <Route path="/Admin/teachers" element={<ShowTeachers />} />
          <Route
            path="/Admin/teachers/teacher/:id"
            element={<TeacherDetails />}
          />
          <Route
            path="/Admin/teachers/chooseclass"
            element={<ChooseClass situation="Teacher" />}
          />
          <Route
            path="/Admin/teachers/choosesubject/:id"
            element={<ChooseSubject situation="Norm" />}
          />
          <Route
            path="/Admin/teachers/choosesubject/:classID/:teacherID"
            element={<ChooseSubject situation="Teacher" />}
          />
          <Route
            path="/Admin/teachers/addteacher/:id"
            element={<AddTeacher />}
          />

          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Box>
    </div>
  );
};

export default AdminDashboard;
