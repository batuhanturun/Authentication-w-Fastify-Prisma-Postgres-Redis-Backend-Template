import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { getData, postData } from '../functions';
import { FaLinkedinIn } from "react-icons/fa";
import map from "../assets/images/Map.png"
import image from "../assets/images/3.jpg"


export default function Contact() {

  let [errorMessage, setErrorMessage] = useState();
  let [name, setName] = useState();
  let [issue, setIssue] = useState();
  let [phone, setPhone] = useState();
  let [location, setLocation] = useState();
  let [message, setMessage] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const home = async () => {
      const response = await getData("/");
      if (!response.state) {
        nav("/login");
      }
    };
    home();
  });

  async function submitMessage(e) {
    e.preventDefault();
    const response = await postData("/contact", { name: name, issue: issue, phone: phone, location: location, message: message });
    if (response.send) {
      nav("/successful");
    } else {
      setErrorMessage(response.message);
    }
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>
            Authentication Demo
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/'}>
                  Homepage
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/'}>
                  Patch Notes
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/'}>
                  Forum
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/contact'}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/logout'}>
                  Exit
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="contact2" style={{ backgroundImage: `url(${map})` }} id="contact">
        <div className="container">
          <div className="row contact-container">
            <div className="col-lg-12">
              <div className="card card-shadow border-0 mb-4">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="contact-box p-4">
                      <h4 className="title">Contact Us</h4>
                      {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                      <form>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group mt-3">
                              <input name='name' className="form-control" type="text" placeholder="name" required onChange={(e) => setName(e.target.value)} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group mt-3">
                              <input name='issue' className="form-control" type="text" placeholder="issue" required onChange={(e) => setIssue(e.target.value)} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group mt-3">
                              <input name='phone' className="form-control" type="text" placeholder="phone" required onChange={(e) => setPhone(e.target.value)} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group mt-3">
                              <input name='location' className="form-control" type="text" placeholder="location" required onChange={(e) => setLocation(e.target.value)} />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group mt-3">
                              <input name='message' className="form-control" type="text" placeholder="message" required onChange={(e) => setMessage(e.target.value)} />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <button type="submit" className="btn btn-danger-gradiant mt-3 mb-3 text-white border-0 py-2 px-3" onSubmit={submitMessage}><span> SUBMIT NOW <i className="ti-arrow-right"></i></span></button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-image" style={{ backgroundImage: `url(${image})` }}>
                    <div className="detail-box p-4">
                      <h5 className="text-white font-weight-light mb-3">ADDRESS</h5>
                      <p className="text-white op-7">Hacettepe Teknokent 6. Ar-Ge C Blok
                        <br /> No: 41 Beytepe/Ankara </p>
                      <h5 className="text-white font-weight-light mb-3 mt-4">CALL US</h5>
                      <p className="text-white op-7">+90 (312) 227 00 60</p>
                      <div className="round-social light">
                        <a href="https://tr.linkedin.com/company/bammatech" className="ml-0 text-decoration-none text-white border border-white rounded-circle"><i className="icon-social-facebook"></i><FaLinkedinIn /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
