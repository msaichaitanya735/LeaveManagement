import React, { useEffect, useState } from 'react'
import chay from '../Images/userPic.png' 
import settings from '../Images/settings.png'
import Line from './LineD'
import { useHistory } from "react-router-dom";
import axios from 'axios';
const Myleaves = () => {
   const [leaves,setLeaves]=useState([]) 
  const history = useHistory()
  const userid = localStorage.getItem('userid')
  const email = localStorage.getItem('emailid')

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
  },[])
  const handleLogout=()=>{
    axios.put(`http://localhost:5000/api/user/lastlogin?id=${localStorage.getItem('id')}`).then((res)=>console.log("logged out"))
    localStorage.removeItem('authToken')
    history.push('/')
  }
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
               
                 <div>
                 <div classname="userLeaves">
               <table id="userData">
                <tr>
                <th>Name</th>
                <th>Leave Type</th>
                <th>Leave Days Requested</th>
                <th>Status</th>
                </tr>
                {leaves.map((req,i)=>{
                    const ReqView=()=>{
                        history.push(`/admin/requestview?id=${req._id}`)
                        localStorage.setItem('reqid',req._id)
                    }
                    return (
                        <tr>
                        <td>{req.from}</td>
                        <td>{req.leavetype}</td>
                        <td>{req.numberofdays}</td>
                        <td id={`${req.status}`}> {req.status} </td>
                        </tr>
                    )
                })}
               </table>
               </div>
               </div>
               </div>
             
         
        </div>
    )
}

export default Myleaves
