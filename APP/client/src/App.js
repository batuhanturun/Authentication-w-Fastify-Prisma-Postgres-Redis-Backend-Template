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
        <Route path='/adminlogout' exact element={<AdminLogOut />} />
        <Route path="/verify/:id/:verifyCode" element={<Verification />} />
        <Route path="/reset/:id/:resetCode" element={<ResetPasswordMail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;