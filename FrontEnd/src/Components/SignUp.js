import axios from 'axios';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
    
    const [userid,setUserid]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmpassword,setConfirmpassword]=useState('');
    const [error,setError]=useState('')
    const [ax,setAx]=useState({})

    console.log(props.counter)

    const handleregister=async(e)=>{
         e.preventDefault()
        console.log(userid,email,password)
        const reg = {
            userid:userid,
            email:email,
            password:password
        }
        const config={
            header:{
                "Content-Type":"application/json"
            }
        }

         if(password!==confirmpassword){
            setPassword('');
            setConfirmpassword('');
         }

         try {
             axios.post('http://localhost:5000/api/auth/register',reg).then((res)=>localStorage.setItem("authToken",res.data.token))

            // history.push("/")

         } catch (error) {
            //  setError(error.response.data.error)
            //  setTimeout(()=>{
            //      setError("");
            //  },5000)
         }
    }

    return (
        <div className="Signup">
        <form action="">
        <h2>Signup</h2>
        <div className="username">
        <input type="text" placeholder="UserId" value={userid} onChange={(e)=>setUserid(e.target.value)}/>
        </div>
        <div className="email">
        <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="password">
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="password">
        <input type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)}/>
        </div>
       <button onClick={handleregister}>Sign up</button>
       <p onClick={()=>{
              props.dispatch({type:'ReSwitch',payload:1})
          }}>Login?</p>
        </form>
     </div>
    )
}

export default connect((store)=>{return store})(SignUp)
