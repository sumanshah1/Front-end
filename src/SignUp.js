import React, { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const [name,setName] = useState("")
    const[email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const Navigate = useNavigate();

    //Thsi Function is Used to disable Signup if User is Already Signin
    useEffect(()=>{
      const auth = localStorage.getItem("user")
      if(auth){
        Navigate('/contact')
      }
    })

    const getData= async ()=>{
        
    console.log(name, email, password)
    let  result = await fetch('http://localhost:8000/register',{
      method:'post',
      body:JSON.stringify({name, email, password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result = await result.json()
    console.log(result)
    localStorage.setItem("user", JSON.stringify(result.result))
    localStorage.setItem("token", JSON.stringify(result.auth))
      Navigate('/contact')
   

    }
    const goToLogin = ()=>{
        Navigate("/login")
    }
    return (
        <div className='signup'>
            <div class="container">
                <div class="github-logo">
                    <i class="fa-brands fa-github"></i>
                </div>
                <h1 class="github-head">
                    Sign Up 
                </h1>
                <div class="login-wrapper">
                    <div class="input-box">
                        <div class="input-label">Username</div>
                        <input type="text" value={name} onChange={(e)=> setName(e.target.value)} required />
                    </div>

                    <div class="input-box">
                        <div class="input-label">Email</div>
                        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} required />
                    </div>

                    <div class="input-box">
                        <div class="input-label">
                            <span>Password</span>
                          
                        </div>
                        <input type="password" value={password} onChange={(e)=> setPass(e.target.value)} required />
                    </div>

                    <button class="submit-btn" onClick={getData}>
                        SignUp
                    </button>
                </div>

                <div class="info">
                    <span>Already have Account<a onClick={goToLogin}>Sign in.</a></span>
                </div>
            </div>


        </div>
    )
}

export default SignUp