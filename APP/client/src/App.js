import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
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

function App() {

  const user = localStorage.getItem("token"); //! Düzelt

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/'}>
              Authentication Demo
            </Link>
            {!user ? (
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/login'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/register'}>
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            ) : (
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/logout'}>
                    Exit
                  </Link>
                </li>
              </ul>
            </div>
            )}        
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {user && <Route path='/' exact element={<Home />} />}
              <Route path='/login' exact element={<Login />} />
              <Route path='/register' exact element={<Register />} />
              <Route path='/resetpassword' exact element={<ResetPassword />} />
              <Route path='/resendverificationmail' exact element={<ResendVerificationMail />} />
              <Route path='/adminlogin' exact element={<AdminLogin />} />
              <Route path='/admin' exact element={<AdminPage />} />
              <Route path='/' exact element={<Navigate replace to ="/login" />} />
              <Route path="/:id/verify/:verifyCode" element={<Verification />} />
              <Route path="/:id/verify/:resetCode" element={<ResetPasswordMail />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
