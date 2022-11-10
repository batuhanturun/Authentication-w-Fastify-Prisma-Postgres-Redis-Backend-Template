import React from 'react'
import { useState } from 'react'
import postData from '../functions';


export default function Login() {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMessage, setErrorMessage] = useState(null)

  async function submitLogin(e) {
    e.preventDefault();
    const response = await postData("/login", { email: email, password: password });

    console.log("response", response)
    if (response.state === true) {
      console.log("User Successfuly Logged In! ", response);
    }
    else {
      setErrorMessage(response.message)
    }
  }

  return (
    <form onSubmit={submitLogin}>
      <h3>Login</h3>  
      {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
      <div className='mb-3'>
        <label>Email:</label>
        <input type="email" name='email' className="form-control" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Password:</label>
        <input type="password" name='password' className="form-control" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
      <p className="forgot-password text-right">Don't have an account? <a href="/register">Register</a></p>
      <p className="forgot-password text-right"><a href="/resetpassword">Forgot password?</a></p>
    </form>
  )

}