import React from 'react'
import LoginPage from './LoginPage'
import SignUp from './SignUp'
import  bg from '../Images/book.jpg'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
function HomePage(props) {
    console.log(props.counter)


    return (
        <div className="banner">
            <img src={bg} alt="" />
            <div className="content">
               <div className="text">
               <h1>Do what you </h1>
               <p>To Keep connected with us please</p>
               <p>login with your personal info.</p>
               </div>
               <div className="LSpage">
               {props.counter>0?<LoginPage />:<SignUp />}
                 
                 
               </div>
            </div>
        </div>
    )
}

export default connect((store)=>{return store})(HomePage)
