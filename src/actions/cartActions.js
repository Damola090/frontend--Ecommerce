import axios from 'axios'

import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants'

export const addItemToCart = (id, quantity) => async (dispatch, getstate) => {
    const response = await fetch(`/api/v1/product/${id}` , {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }

    })

    const data = await response.json()

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity: quantity
        }

    })

    // we save this data to local Storage, so even if we reload the page 
      //  The user will still have access to the data he added to cart

    localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))


} 

export const removeItemFromCart = (id) => async (dispatch, getstate) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id

    })

    // we save this data to local Storage, so even if we reload the page 
      //  The user will still have access to the data he added to cart

      localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))


} 


export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data

    })

    // we save this data to local Storage, so even if we reload the page 
      //  The user will still have access to the data he added to cart

      localStorage.setItem('shippingInfo', JSON.stringify(data))


} 

