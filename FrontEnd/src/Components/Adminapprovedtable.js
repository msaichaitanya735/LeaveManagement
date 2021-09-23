import React, { useEffect, useState } from 'react'
import chay from '../Images/userPic.png' 
import off from '../Images/office.svg'

import axios from 'axios'
import { useHistory } from "react-router-dom";
import AdminInterface from './AdminInterface';


function Adminapprovedtable() {
    const history = useHistory()
    const showpending=(()=>{
      history.push('/admin/pendingrequest')
    })
    const showapproved=(()=>{
      history.push('/admin/approvedrequest')
    })
    const [allrequest,setAllrequest]=useState([])
    const [approved,setApproved]=useState([])
    useEffect(()=>{
        const token = localStorage.getItem('authToken')
        const config={
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }
        setTimeout(()=>
        {
            axios.get('http://localhost:5000/api/user/getallleaves',config).then((res)=>
        {
            setAllrequest(res.data)
            // console.log(res.data)
        })
        axios.get('http://localhost:5000/api/user/getapproved',config).then((res)=>{
            setApproved(res.data)
            // console.log(res.data)
        })

        },100)
    //     axios.get('http://localhost:5000/api/user/getallleaves',config).then((res)=>
    //     {
    //         setAllrequest(res.data)
    //         // console.log(res.data)
    // })
    // axios.get('http://localhost:5000/api/user/getapproved',config).then((res)=>{
    //     setApproved(res.data)
    //     // console.log(res.data)
    // })
    },[])
    return (
        <div className="Admin">
        <AdminInterface/>
        <div className="AdminPannel">
           <div className="pannel_navPA">
           
            <h1> <img src={chay} alt="" />Welcome back, {localStorage.getItem('userid')}!</h1>
            <h2>admin</h2>
           </div>
           <div className="control_pannel">

            <table id="userData" style={{padding:'-300px'}}>
                <tr>
                <th>Name</th>
                <th>Leave Type</th>
                <th>Leave Days Requested</th>
                <th>Status</th>
                </tr>


                {approved.map((req,i)=>{
                    const ReqView=()=>{
                        history.push(`/admin/requestview?id=${req._id}`)
                        localStorage.setItem('reqid',req._id)
                    }
                    return (
                        <tr onClick={ReqView}>
                        <td>{req.from}</td>
                        <td>{req.leavetype}</td>
                        <td>{req.numberofdays}</td>
                        <td id={`${req.status}`}> {req.status} </td>
                        </tr>
                    )
                })}
                {/* <tr>
                <td>Chay</td>
                <td>Casual Leave</td>
                <td>4 Days</td>
                <td id="approve"> Approved </td>
                </tr>
                <tr>
                <td>Chay</td>
                <td>Sick Leave</td>
                <td>2 Days</td>
                <td id="reject"> Rejected </td>
                </tr> */}
               </table>
               <div className="off">
                <img  src={off} alt="" />
                </div>
            </div>
        </div>
        </div>
        
    )
}

export default Adminapprovedtable
