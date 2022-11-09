import React, { Component } from 'react'

export default function Login() {
  return (
    <form>
      <h2>Welcome Back!</h2>
      <fieldset>
        <legend>Login</legend>
        <ul>
          <li>
            <label for="email">Email: </label>
            <input type="email" id="email" required />
          </li>
          <li>
            <label for="password">Password: </label>
            <input type="password" id="password" required />
          </li>
          <li>
            <i />
            <href>Forgot Password?</href>
          </li>
        </ul>
      </fieldset>
      <button>Login</button>
      <button type="button">Create An Account</button>
    </form>
  )
}

import React from 'react'

export default function Register() {
    return (
        <div>
            <form>
                <h2>Register!</h2>
                <fieldset>
                    <legend>Create Account</legend>
                    <ul>
                        <li>
                            <label for="name">Name: </label>
                            <input type="text" id="name" required />
                        </li>
                        <li>
                            <label for="email">Email: </label>
                            <input type="email" id="email" required />
                        </li>
                        <li>
                            <label for="password">Password: </label>
                            <input type="password" id="password" required />
                        </li>
                    </ul>
                </fieldset>
                <button>Submit</button>
                <button type="button">Have an Account?</button>
            </form>
        </div>
    )
}

import React from 'react'

export default function ResetPassword() {
  return (
    <form>
        <h2>Reset Password!</h2>
        <fieldset>
            <legend>Password Reset</legend>
            <ul>
                <li>
                    <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                    <label for="email">Email: </label>
                    <input type="email" id="email" required />
                </li>
            </ul>
        </fieldset>
        <button>Send Reset Link</button>
        <button type="button">Go Back</button>
    </form>
  )
}


import React from 'react'
import videoF1_1 from '../assets/f1_1.mp4'
import '../Dindex.css'

export default function Home() {
    return (
        <div className='main'>
            <div className='overlay'></div>
            <video src={videoF1_1} autoPlay loop muted />
            <div className='content'>
                <div className='wBorder'>
                    <h1 className='mWelcome'>Welcome</h1>
                </div>
            </div>
        </div>
    )
}

