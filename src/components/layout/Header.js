import React, { Fragment } from 'react'
import { Link, Route } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'

import Search from './Search'
import '../../App.css'

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)


  const logoutHandler = () => {
    dispatch(logout())
    alert.success('Logged Out Successfully')
  }

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/logo.png" alt='' />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to='/cart' style={{ textDecoration: 'none' }} >
            <span id="cart" className="ml-1">Cart</span>
            <span className="ml-5" id="cart_count">{cartItems.length}</span>
          </Link>
          {user ? (
            <div className='ml-4 dropdown d-inline'>
              <button 
                  className="btn btn-secondary dropdown-toggle" 
                  type="button" 
                  id="dropdownMenuButton1" 
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                    
                  <Link to="!#"

                  style={{ textDecoration: 'none' }}
                  >
                  <figure className='avatar avatar-nav'>
                    <img
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      className='rounded-circle'
                    />
                  </figure>
                  <span>{user && user.name}</span>

                </Link>
              </button>

              {/* <dropdown Menu> */}
              <ul className='dropdown-menu' aria-labelledby='dropDownMenuButton1'>
                  {user && user.role !== 'admin' ? (
                    <li><Link className='dropdown-item' to='/orders/me'>Orders</Link></li>
                  ) : (
                    <li><Link className='dropdown-item' to='/dashboard'>Dashboard</Link></li>
                  )}
                <li><Link className='dropdown-item' to='/me'>Profile</Link></li>
                <li
                onClick={logoutHandler}
                ><Link className='dropdown-item text-danger' to='/'>Logout</Link></li>

              </ul>

            </div>

          ) : !loading && <Link to="/login" className="btn ml-6" id="login_btn">Login</Link>}

        </div>
      </nav>
    </Fragment>
  )
}

export default Header