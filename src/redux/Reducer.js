import * as actionTypes from '../redux/ActionTypes';

const ingredient_prices = {
    cheese: 40,
    salad: 20,
    meat: 60
}

const INITIAL_STATE = {
    ingredients: [
        { type: 'cheese', amount: 0 },
        { type: 'salad', amount: 0 },
        { type: 'meat', amount: 0 }
    ],
    orders: [],
    orderLoading: true,
    orderErr: false,
    totalPice: 80,
    purchaseable: false
}

export const reducer = (state = INITIAL_STATE, action) => {
    const ingredients = [...state.ingredients];

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) item.amount++;
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPice: state.totalPice + ingredient_prices[action.payload]
            }
        case actionTypes.REMOVE_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--;
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPice: state.totalPice - ingredient_prices[action.payload]
            }
        case actionTypes.UPDATE_PURCHASABLE:
            const sum = state.ingredients.reduce((sum, element) => {
                return sum + element.amount;
            }, 0)
            return {
                ...state,
                purchaseable: sum > 0
            }
        case actionTypes.RESET_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    { type: 'cheese', amount: 0 },
                    { type: 'salad', amount: 0 },
                    { type: 'meat', amount: 0 }
                ],
                totalPice: 80,
                purchaseable: false
            }
        case actionTypes.LOAD_ORDERS:
            //console.log(action.payload);
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key
                })
            }
            return {
                ...state,
                orders: orders,
                orderLoading: false
            }
        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderLoading: false,
                orderErr: true
            }
        default:
            return state;
    }
}