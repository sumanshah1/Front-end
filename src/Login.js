import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


import "./Login.css"
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const Navigate = useNavigate();
 

  //If user is login they cant go to the login pages
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      //Navigate("/");
    }
  }, []);

  async function loginHandle() {
    let result = await fetch("http://localhost:8000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      console.log("logged in")
      Navigate("/contact")
    } else {
      alert("Invalid Email or Password!!!");
    }
  }
  const goToSignUp = ()=>{
    Navigate("/signup")
  }

  return (
    <div className='Login'>
<div class="container">
    <div class="github-logo">
      <i class="fa-brands fa-github"></i>
    </div>
    <h1 class="github-head">
      Sign in to Account
    </h1>
    <div class="login-wrapper">
      <div class="input-box">
        <div class="input-label">Email</div>
        <input type="text" value={email}
        onChange={(e) => setEmail(e.target.value)} required/>
      </div>

      <div class="input-box">
        <div class="input-label">
          <span>Password</span>
         
        </div>
        <input type="password" value={password}
        onChange={(e) => setPassword(e.target.value)} required/>
      </div>

      <button class="submit-btn" onClick={loginHandle}>
        Submit
      </button>
    </div>

    <div class="info">
      <span>New to Website <a onClick={goToSignUp}>Create an account.</a></span>
    </div>
  </div>




        
    </div>
  )
}

export default Login