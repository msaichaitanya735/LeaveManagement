import React from 'react'
import chay from '../Images/AdminPic.PNG' 
import settings from '../Images/settings.png'
import axios from 'axios'
import { useHistory } from "react-router-dom";



const AdminInterface = () => {
    const history = useHistory()

    const handleLogout=()=>{
        axios.put(`http://localhost:5000/api/user/lastlogin?id=${localStorage.getItem('id')}`).then((res)=>console.log("logged out"))
        localStorage.removeItem('authToken')
        history.push('/')
      }
    const showpending=(()=>{
        history.push('/admin/pendingrequest')
      })
      const showapproved=(()=>{
        history.push('/admin/approvedrequest')
      })
    return (
        <div className="Admin">
            <div className="AdminProfile">
               <img className="settings" src={settings} onClick={handleLogout}/>
            <img id="circle" src={chay} alt="" />
              <h1 >{localStorage.getItem('userid')}</h1>
              <p>{localStorage.getItem('emailid')}</p>
              <h3 >dashboard</h3>
              <ul>
              <li onClick={showpending}>Pending Leave Requests</li>
              <li onClick={showapproved}>Approved Leave Requests</li>
              {/* <li>Last Login</li> */}
              </ul>
            </div>
               </div>
    )
}

export default AdminInterface
