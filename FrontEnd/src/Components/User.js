import React, { useEffect, useState } from 'react'
import chay from '../Images/userPic.png' 
import settings from '../Images/settings.png'
import axios from 'axios'
import { useHistory } from "react-router-dom";
const User = () => {
  const [leaves,setLeaves]=useState([]) 
  const [approvedleaves,setApprovedleaves]=useState([]) 
  const [pendingleaves,setPendingleaves]=useState([]) 
  const history = useHistory()
  const userid = localStorage.getItem('userid')
  const email = localStorage.getItem('emailid')
  const handleLogout=()=>{
    axios.put(`http://localhost:5000/api/user/lastlogin?id=${localStorage.getItem('id')}`).then((res)=>console.log("logged out"))
    localStorage.removeItem('authToken')
    history.push('/')
  }
  useEffect(()=>{
    const token = localStorage.getItem('authToken')
    const config={
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }
    axios.get(`http://localhost:5000/api/user/myleaves?email=${email}`,config).then((res)=>{
    setLeaves(res.data)
    })
    axios.get(`http://localhost:5000/api/user/myapprovedleaves?email=${email}`,config).then((res)=>{
    setApprovedleaves(res.data)
    })
    axios.get(`http://localhost:5000/api/user/mypendingleaves?email=${email}`,config).then((res)=>{
    setPendingleaves(res.data)
    })
  },[])
    return (
        <div className="userPage">
            <div className="userProfile">
            <img className="settings" src={settings} onClick={handleLogout}/>
            <img id="circle" src={chay} alt="" />
              <h1>{userid}</h1>
              <p>{email}</p>
              <h3>dashboard</h3>
              <ul>
              <li onClick={()=>{history.push('/user/myleaves')}}>My Leave </li>
              <li onClick={()=>{history.push('/user/leave')}}>New Leave </li>
              </ul>
            </div>
            <div className="userPannel">
               <div className="userDetails">  
               <h1>Welcome, {localStorage.getItem('userid')}!</h1>
               <h2>user</h2>
               </div>
               <div className="userLeaves">
               
               <div className="box u1">
                 <h1>Total Applied Leave</h1>
                 <p>{leaves.length}</p>
                 </div>
                 <div className="box u2">
                 <h1>Approved Leaves</h1>
                 <p>{approvedleaves.length}</p>
                 </div>
                
                 <div className="box u3">
                 <h1>Pending Leave</h1>
                 <p>{pendingleaves.length}</p>
                 </div>
                 <div className="box u4">
                 <h1>Last LogIn</h1>
                 <p>{localStorage.getItem('lastlogin').slice(0,10)}</p>
                 </div>
               
                 <div>
               </div>
               </div>
             
            </div>
         
        </div>
    )
}

export default User
