import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home';
import Login from "./screens/Login";
import Register from "./screens/Register";
import ResetPassword from "./screens/ResetPassword";
import ResendVerificationMail from "./screens/ResendVerificationMail";
import AdminPage from "./screens/AdminPage";
import AdminLogin from "./screens/AdminLogin";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Verification from "./screens/Verification";
import ResetPasswordMail from "./screens/ResetPasswordMail";
import Logout from "./screens/Logout";
import AdminLogOut from "./screens/AdminLogout";
import Logging from "./screens/Logging";
import AdminLogging from "./screens/AdminLogging";
import Successful from "./screens/Successful";
import PatchNotes from "./screens/PatchNotes";
import Contact from "./screens/Contact";
import ComingSoon from "./screens/ComingSoon";
import Forum from "./screens/Forum";
import Profile from "./screens/Profile";

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
        <Route path='/profile' exact element={<Profile />} />
        <Route path='/comingsoon' exact element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;