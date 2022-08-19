import React, { Fragment }from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoutes = () => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    return (
        isAuthenticated  ? <Outlet /> : <Navigate to="/login"/>
          
    )
}

export default ProtectedRoutes;

// <Fragment>
        //     {loading === false && (
        //         <Route
        //             {...rest}
        //             render={props => {
        //                 if (isAuthenticated === false) {
        //                     return <Redirect to='/login' />
        //                 }

        //                 return <Component {...props} />
        //             }}
        //         />
        //     )}
        // </Fragment>