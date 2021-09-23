import React, { useState } from 'react'
import chay from '../Images/userPic.png' 
import settings from '../Images/settings.png'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const Leaveform = () => {
    const history = useHistory()
    const [leavetype,setLeavetype]=useState('')
    const [subject,setSubject]=useState('');
    const [reason,setReason]=useState('')
    const [startdate,setStartdate]=useState('')
    const [enddate,setEnddate]=useState('');

    const handleSubmit=((e)=>{
        const token=localStorage.getItem('authToken')
        const config={
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }
        const leave_request={
            from:localStorage.getItem('userid'),
            email:localStorage.getItem('emailid'),
            leavetype: leavetype,
            subject:subject,
            reason:reason,
            startdate:startdate,
            enddate:enddate
        }
        axios.post('http://localhost:5000/api/user/requestleave',leave_request,config).then((res)=>console.log(res.data))
    })
    const handleLogout=()=>{
        axios.put(`http://localhost:5000/api/user/lastlogin?id=${localStorage.getItem('id')}`).then((res)=>console.log("logged out"))
        localStorage.removeItem('authToken')
        history.push('/')
      }
    return (
        <div>
              <div className="userPage">
            <div className="userProfile">
            <img className="settings" src={settings} onClick={handleLogout}/>
            <img id="circle" src={chay} alt="" />
              <h1>{localStorage.getItem('userid')}</h1>
              <p>{localStorage.getItem('emailid')}</p>
              <h3>dashboard</h3>
              <ul>
              <li onClick={()=>{history.push('/user/myleaves')}} >My Leave </li>
              <li>New Leave </li>
              </ul>
            </div>
            <div className="userPannel">
               <div className="userDetails">  
               <h1>Welcome, {localStorage.getItem('userid')}!</h1>
               <h2>user</h2>
               </div>
               <div className="userLeave">
                    <h3>Leave Type:</h3>
                    <select className="formin" onChange={(e)=>setLeavetype(e.target.value)}>
                        <option > Choose type of Leave</option>
                        <option value={'Sick Leave'}>Sick Leave</option>
                        <option value={'Casual Leave'}>Casual Leave</option>
                        <option value={'Marriage Leave'}>Marriage Leave</option>
                        <option value={'Maternity Leave'}>Maternity Leave</option>
                        <option value={'Paid Leave'}>Paid Leave</option>
                        <option value={'Loss of pay'}>Loss of pay</option>
                        <option value={'Paternity Leave'}>Paternity Leave</option>
                    </select>
                    {/* <h3>Leave Type:</h3>
                    <input type="text" className="formin" placeholder="Leave Type " value={leavetype} onChange={(e)=>setLeavetype(e.target.value)}/> */}
                    <h3>Subject:</h3>
                    <input type="text" className="formin" placeholder="Subject " value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                    <h3>Reason:</h3>
                    <textarea name="textarea" rows="5" colums="5" className="formins" placeholder="Reason" value={reason} onChange={(e)=>setReason(e.target.value)}/>
                    {/* <input type="textbox" className="formin" placeholder="Reason " value={reason} onChange={(e)=>setReason(e.target.value)}/> */}
                    <h3>Start Date:</h3>
                    <input type="date" className="formin" placeholder="Start Date " value={startdate} onChange={(e)=>setStartdate(e.target.value)}/>
                    <h3>End Date:</h3>
                    <input type="date" className="formin" placeholder="End Date " value={enddate} onChange={(e)=>setEnddate(e.target.value)}/>
                    <button className="formbtn" onClick={handleSubmit}>Submit</button>
                    
                    </div>
               </div>
               </div>
        </div>
    )
}

export default Leaveform
