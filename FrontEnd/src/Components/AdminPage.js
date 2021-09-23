import React, { useEffect, useState } from 'react'
import chay from '../Images/AdminPic.PNG' 
import off from '../Images/office.svg'
import { useHistory } from "react-router-dom";
import AdminInterface from './AdminInterface';
import axios from 'axios'
function AdminPage() {
  const [pending,setPending]=useState([])
  const [approved,setApproved]=useState([])
  const [time,setTime]=useState([])

  // const diff = Math.abs(Date.now().getTime()-localStorage.getItem('lastlogin'))
  // console.log(diff)
  // var t='';
  // var s='';
  // useEffect(()=>{
  //   t=Date.now()
  //   s=t-localStorage.getItem('lastlogin')
  //   },[]
  // )
  
  const history = useHistory()
  const token = localStorage.getItem('authToken')
        const config={
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`

            }
        }
    const showpending=(()=>{
      history.push('/admin/pendingrequest')
    })
    const showapproved=(()=>{
      history.push('/admin/approvedrequest')
    })
    useEffect(()=>{
       axios.get('http://localhost:5000/api/user/getpending',config).then((res)=>{
         setPending(res.data)
    })
     axios.get('http://localhost:5000/api/user/getapproved',config).then((res)=>{
       setApproved(res.data)
  })
    },[])
    return (
            <div className="Admin">
            <AdminInterface/>
            <div className="AdminPannel">
               <div className="pannel_nav">
               
                <h1> <img src={chay} alt="" />Welcome back, {localStorage.getItem('userid')}!</h1>
                <h2>admin</h2>
               </div>
               <div className="control_pannel">
               <div className="cp">
               <div className="box b1">
                 <h1 onClick={showpending}>Pending Requests</h1> 
                 <p>{pending.length}</p>
                 <p>Due Tasks</p>
                 </div>
                 <div className="box b2">
                 <h1 onClick={showapproved}>Approved Requests</h1>
                 <p>{approved.length}</p>
                 <p>Completed Tasks</p>
                 </div>
                 <div className="box u4">
                 <h1>Last Login</h1>
                 <p>!</p>
                 <p>{localStorage.getItem('lastlogin').slice(0,10)}</p>
                 </div>
               </div>
                <div className="off">
                <img  src={off} alt="" />
                </div>
               </div>
               </div>
               </div>
               
    )
}

export default AdminPage
