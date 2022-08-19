import axios from 'axios'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    CLEAR_ERRORS,

} from '../constants/userConstants'

//login 
export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const form = {email, password}

        const response  = await fetch('/api/v1/login', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type' : 'application/json'
            }

        })

        const data = await response.json()
    
        console.log(data)
        dispatch({ 
            type: LOGIN_SUCCESS,
            payload: data.user
        
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })

    }

}

// Register User
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const response = await fetch('/api/v1/register', {
            method: 'POST',
            body: userData,
            // headers : {
            //     'Content-Type' : 'multipart/form-data'
            // }

        })

        const data = await response.json()

        console.log(data)

        dispatch({ 
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })

    }

}

// Load User
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me')

        dispatch({ 
            type: LOAD_USER_SUCCESS,
            payload: data.user
        
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })

    }

}

// Update User Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const response  = await fetch('/api/v1/me/update', {
            method: 'PUT',
            body: userData,
            // headers : {
            //     'Content-Type' : 'multipart/form-data'
            // }

        })

        const data = await response.json()
        console.log(data.success)

        dispatch({ 
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })

    }

}


// Update  Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const response  = await fetch('/api/v1/password/update', {
            method: 'PUT',
            body: passwords,
            // headers : {
            //     'Content-Type' : 'application/json'
            // }

        })

        const data = await response.json()

        console.log(data)

        dispatch({ 
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })

    }

}

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const response  = await fetch('/api/v1/password/forgot', {
            method: 'POST',
            body: email
            // headers : {
            //     'Content-Type' : 'application/json'
            // }

        })

        const data = await response.json()

        console.log(data)

        dispatch({ 
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })

    }

}


// reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST })

        const response  = await fetch(`/api/v1/password/reset/${token}`, {
            method: 'PUT',
            body: passwords
            // headers : {
            //     'Content-Type' : 'application/json'
            // }

        })

        const data = await response.json()

        dispatch({ 
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })

    }

}

//LOGOUT USER 
export const logout = () => async (dispatch) => {
    try {

        await axios.get('/api/v1/logout')

        dispatch({ 
            type: LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })

    }

}



//Clear Errors 
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })

}
