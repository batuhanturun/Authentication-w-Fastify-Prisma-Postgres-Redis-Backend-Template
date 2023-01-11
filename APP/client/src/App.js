import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Users/HomePage/Home';
import Login from "./screens/Users/Login/Login";
import Register from "./screens/Users/Register/Register";
import ResetPassword from "./screens/Users/ResetPassword/ResetPassword";
import ResendVerificationMail from "./screens/Users/Verification/ResendVerificationMail";
import AdminPage from "./screens/Admin/AdminHomePage/AdminPage";
import AdminLogin from "./screens/Admin/AdminLoginPage/AdminLogin";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Verification from "./screens/Users/Verification/Verification";
import ResetPasswordMail from "./screens/Users/ResetPassword/ResetPasswordMail";
import Logout from "./screens/Users/Components/Logout";
import AdminLogOut from "./screens/Admin/AdminComponents/AdminLogout";
import Logging from "./screens/Users/Components/Logging";
import AdminLogging from "./screens/Admin/AdminComponents/AdminLogging";
import Successful from "./screens/Users/Components/Successful";
import PatchNotes from "./screens/Users/PatchNotes/PatchNotes";
import Contact from "./screens/Users/Contact/Contact";
import ComingSoon from "./screens/Users/Components/ComingSoon";
import Forum from "./screens/Users/Forum/Forum";
import Profile from "./screens/Users/Profile/Profile";
import ChangeEmail from "./screens/Users/Profile/ChangeEmail";
import ChangePassword from "./screens/Users/Profile/ChangePassword";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/resetpassword' exact element={<ResetPassword />} />
        <Route path='/resendverificationmail' exact element={<ResendVerificationMail />} />
        <Route path='/adminlogin' exact element={<AdminLogin />} />
        <Route path='/admin' exact element={<AdminPage />} />
        <Route path='/' exact element={<Home />} />
        <Route path='/logout' exact element={<Logout />} />
        <Route path='/logging' exact element={<Logging />} />
        <Route path='/successful' exact element={<Successful />} />
        <Route path='/adminlogging' exact element={<AdminLogging />} />
        <Route path='/adminlogout' exact element={<AdminLogOut />} />
        <Route path="/verify/:id/:verifyCode" element={<Verification />} />
        <Route path="/reset/:id/:resetCode" element={<ResetPasswordMail />} />
        <Route path='/patchnotes' exact element={<PatchNotes />} />
        <Route path='/contact' exact element={<Contact />} />
        <Route path='/forum' exact element={<Forum />} />
        <Route path='/profile/main' exact element={<Profile />} />
        <Route path='/profile/changemail' exact element={<ChangeEmail />} />
        <Route path='/profile/changepassword' exact element={<ChangePassword />} />
        <Route path='/comingsoon' exact element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;