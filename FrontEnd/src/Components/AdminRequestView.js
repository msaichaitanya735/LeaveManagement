import React, { Component, useEffect, useState } from 'react'
import chay from '../Images/AdminPic.PNG' 
import off from '../Images/office.svg'
import settings from '../Images/settings.png'
import { useHistory } from "react-router-dom";
import axios from 'axios';

function AdminRequestView() {
  const [data,setData]=useState({})
  const history = useHistory()

  const showpending=(()=>{
    history.push('/admin/pendingrequest')
  })
  const showapproved=(()=>{
    history.push('/admin/approvedrequest')
  })

  const token = localStorage.getItem('authToken')
    const config={
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }
  useEffect(()=>{
    const token = localStorage.getItem('authToken')
    const config={
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }
    axios.get(`http://localhost:5000/api/user/viewrequest?id=${localStorage.getItem('reqid')}`,config).then((res)=>
    {
      setData(res.data[0])
},[])

})
    const handelapprove=()=>{
      const response={
        from     :data.from     ,
        email    :data.email    ,
        leavetype:data.leavetype,
        subject  :data.subject  ,
        reason   :data.reason   ,
        startdate:data.startdate,
        enddate  :data.enddate  ,
        status   :'Approved'  
      }
      axios.put(`http://localhost:5000/api/user/respondrequest?id=${localStorage.getItem('reqid')}`,response,config).then((res)=>console.log('Approved'))
    }

    const handlereject=()=>{
      const response={
        from     :data.from     ,
        email    :data.email    ,
        leavetype:data.leavetype,
        subject  :data.subject  ,
        reason   :data.reason   ,
        startdate:data.startdate,
        enddate  :data.enddate  ,
        status   :'Rejected'  
      }
      axios.put(`http://localhost:5000/api/user/respondrequest?id=${localStorage.getItem('reqid')}`,response,config).then((res)=>console.log('Rejected'))
      showpending();
    }
    
    return (
        <div>
                    <div className="Admin">
            <div className="AdminProfile">
               <img className="settings" src={settings}/>
            <img id="circle" src={chay} alt="" onClick={()=>{history.push('/admin')}}/>
              <h1 onClick={()=>{history.push('/admin')}}>{localStorage.getItem('userid')}</h1>
              <p onClick={()=>{history.push('/admin')}}>Chaitanya@gmail.com</p>
              <h3>dashboard</h3>
              <ul>
              <li  onClick={showpending}>Pending Leave Requests</li>
              <li onClick={showapproved}>Approved Leave Requests</li>
              </ul>
            </div>
            <div className="AdminPannel">
               <div className="pannel_navPA">
               
                <h1> <img src={chay} alt="" />Welcome back,{localStorage.getItem('userid')}!</h1>
                <h2>admin:</h2>
               </div>
               <div className="control_pannel">
               <div className="adminLeaves">
               <div className="splits">
               <div className="splitsone">
              <h1 className="leaveinfo">Leave Info</h1>
              <h3>From :      <span>{data.from}</span></h3>
              <h3>Email :      <span>{data.email}</span></h3>
              <h3>LeaveType :      <span>{data.leavetype}</span></h3>
              <h3>Subject :      <span>{data.subject}</span></h3>{console.log({data})}
              <h3>Reason :      <span>{data.reason}</span></h3>
              <h3>Start Date :      <span>{data.startdate}</span></h3>
              <h3>End Date :      <span>{data.enddate}</span></h3>  
              </div>
              <div className="splitstwo">
                <textarea rows="18" cols="30" placeholder="           Remark" />  
              </div>
              </div>
              
                   {data.status!==('Approved')?<div><button className="approvalbuttons" onClick={handelapprove}> Approve </button>
                   <button onClick={handlereject}> Reject </button></div>
                   :<div></div>}
              </div>
              </div>
               </div>
               </div>
        </div>
    )
}

export default AdminRequestView
