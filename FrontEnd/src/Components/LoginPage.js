import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

const LoginPage = (props) => {
    const history = useHistory()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const [admin,setAdmin]=useState('')
    const [token,setToken]=useState('')

    console.log(props.counter)

    const handlelogin=async(e)=>{
        e.preventDefault()
        localStorage.setItem("emailid",email)
       console.log(email,password)
       const log = {
           email:email,
           password:password
       }
        axios.post('http://localhost:5000/api/auth/login',log).then(async(res)=>{
                localStorage.setItem("authToken",res.data.token)
                props.dispatch({type:'AddToken',payload:res.data.token})
                localStorage.setItem("userid",res.data.userid)
                localStorage.setItem("admin",res.data.admin)
                localStorage.setItem("id",res.data.id)
                localStorage.setItem("lastlogin",res.data.lastlogin)
                const tok = res.data.authToken
                console.log("res=",res.data.token)
                localStorage.getItem("authToken")?(
                    localStorage.getItem('admin')=='true'?history.push('/admin'):
                       history.push('/user')
                       ):history.push('/')
                console.log(res.data.admin)   
            },[])
           console.log("Token=",props.authToken)
       
   }
    return (
        <div className="login">
           <form action="">
           <h2>Login</h2>
           <div className="username">
           <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(()=>e.target.value)}/>
           </div>
           <div className="password">
           <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(()=>e.target.value)}/>
           </div>
          <button onClick={handlelogin}>Login</button>
          <p onClick={()=>{
              props.dispatch({type:'Switch',payload:0})
          }}>Create account?</p>
           </form>
        </div>
    )
}

export default connect((store)=>{return store})(LoginPage)
