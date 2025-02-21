import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/common/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import ForgetPassword from "./pages/ForgetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./components/core/Dashboard/MyProfile";

import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";

import Settings from "./components/core/Dashboard/Settings/index";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {
 
  const {user} = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900  flex flex-col font-inter">

      <Navbar />

      <Routes>

        <Route path="/" element={<Home/>} />

        <Route path="/catalog/:catalogName" element={<Catalog />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/update-password/:id" element={<UpdatePassword />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />

          <Route path="/dashboard/settings" element={<Settings />} />

          {
            user?.accountType === "Student" && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />

                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )
          }

          {
            user?.accountType === "Instructor" && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/instructor" element={<Instructor />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }



        </Route>

        <Route path="/courses/:courseId" element={<CourseDetails />} />


      
        

        <Route path="*" element={<Error />} />

        {/* <Route path="" */}
        
        <Route 
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {
            user?.accountType === "Student" && (
              <>
                <Route 
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )
          }

        </Route>

      </Routes>

    </div>
  );
}

export default App;
