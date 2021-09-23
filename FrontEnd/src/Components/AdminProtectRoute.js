import React from 'react'
import {Redirect,Route} from 'react-router-dom'

const AdminProtectRoute = ({component: Component,...rest}) => {
    return (
        <Route
            {...rest}
            render={
                (props)=>
                localStorage.getItem("admin")=='true'?(
                    <Component {...props}/>
                ):(
                    <Redirect to='/user'/>
                )
                
            }
        />
    )
}

export default AdminProtectRoute
