import React from 'react';
import BurgerBuilder from './burgerBuilder/BurgerBuilder';
import Header from './header/Header';
import Orders from './burgerBuilder/orders/Orders';
import Checkout from './burgerBuilder/orders/checkout/Checkout';
import { Route } from 'react-router-dom';
import Auth from './auth/Auth';

const Main = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/login" component={Auth} />
                <Route exact path="/" component={BurgerBuilder} />
            </div>
        </div>
    )
}

export default Main;