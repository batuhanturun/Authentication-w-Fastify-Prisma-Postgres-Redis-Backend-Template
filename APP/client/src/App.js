import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './screens/Home';
import Login from "./screens/Login";
import Register from "./screens/Register";
import ResetPassword from "./screens/ResetPassword";
import ResendVerificationMail from "./screens/ResendVerificationMail";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//! BT Logo -> /login düzelt.

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/login'}>
              BT
            </Link>
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
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/resetpassword' element={<ResetPassword />} />
              <Route path='/resendverificationmail' element={<ResendVerificationMail />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
