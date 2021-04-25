import * as actionTypes from './ActionTypes';
import axios from 'axios';

export const addIngredient = (igtype) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype
    }
}

export const removeIngredient = (igtype) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype
    }
}

export const updatePurchasable = () => {
    return{
        type: actionTypes.UPDATE_PURCHASABLE
    }
}

export const resetIngredient = () => {
    return{
        type: actionTypes.RESET_INGREDIENT
    }
}

export const loadOrders = (orders) => {
    return{
        type: actionTypes.LOAD_ORDERS,
        payload: orders
    }
}

export const orderLoadFailed = () => {
    return{
        type: actionTypes.ORDER_LOAD_FAILED
    }
}
export const fetchOrders = () => dispatch => {
    axios.get("https://my-burger-8d430.firebaseio.com/orders.json")
    .then(response => { 
        dispatch(loadOrders(response.data))
    })
    .catch(err => {
        dispatch(orderLoadFailed())
    })
}