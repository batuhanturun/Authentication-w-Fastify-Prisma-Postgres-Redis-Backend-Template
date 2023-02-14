import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Users/HomePage/Home';
import Login from "./screens/Users/Login/Login";
import Register from "./screens/Users/Register/Register";
import ResetPassword from "./screens/Users/ResetPassword/ResetPassword";
import ResendVerificationMail from "./screens/Users/Verification/ResendVerificationMail";
import AdminPage from "./screens/Admin/AdminHomePage/AdminPage";
import AdminLogin from "./screens/Admin/AdminLoginPage/AdminLogin";
import AdminProfile from "./screens/Admin/AdminProfile/AdminProfile";
import AdminChangePassword from "./screens/Admin/AdminProfile/AdminChangePassword";
import AdminServices from "./screens/Admin/AdminProfile/AdminServices";
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
import Profile from "./screens/Users/Profile/Profile";
import Services from "./screens/Users/Profile/Services";
import PaymentMethods from "./screens/Users/Profile/PaymentMethods";
import AddPaymentMethod from "./screens/Users/Profile/AddPaymentMethod";
import ChangePassword from "./screens/Users/Profile/ChangePassword";
import AdminPatchNotes from "./screens/Admin/AdminPatchNotes/AdminPatchNotes";
import AdminNoteOptions from "./screens/Admin/AdminPatchNotes/AdminNoteOptions";
import NoteDescription from "./screens/Users/PatchNotes/NoteDescription";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
        <Route path='/patchnotes/:id' exact element={<NoteDescription />} />
        <Route path='/contact' exact element={<Contact />} />
        <Route path='/profile/main' exact element={<Profile />} />
        <Route path='/profile/services' exact element={<Services />} />
        <Route path='/profile/paymentmethods' exact element={<PaymentMethods />} />
        <Route path='/profile/addpaymentmethod' exact element={<AddPaymentMethod />} />
        <Route path='/profile/changepassword' exact element={<ChangePassword />} />
        <Route path='/admin/profile/main' exact element={<AdminProfile />} />
        <Route path='/admin/profile/services' exact element={<AdminServices />} />
        <Route path='/admin/profile/changepassword' exact element={<AdminChangePassword />} />
        <Route path='/admin/patchnotes' exact element={<AdminPatchNotes />} />
        <Route path='/admin/patchnotes/:id' exact element={<AdminNoteOptions />} />
        <Route path='/comingsoon' exact element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;