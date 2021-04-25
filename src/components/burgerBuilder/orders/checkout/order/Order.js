import React from 'react';

const Order = (props) => {
    let ingredientSummery = props.order.ingredients.map(item => {
        return(
        <span style={{
            border: "1px solid grey",
            padding: "5px",
            borderRadius: "5px",
            marginRight: "10px"
        }} key={item.type}>{item.amount} X <span style={{textTransform: "capitalize"}}>{item.type}</span></span>
        )
    })
    //console.log(props);
    return(
        <div style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            padding: "20px",
            borderRadius: "5px",
            marginBottom: "10px"
        }}>
            <p>Order id : {props.order.id}</p>
            <p>Delivery Address : {props.order.customer.deliveryAddress}</p>
            <hr />
            {ingredientSummery}
            <hr />
            <p>Total : {props.order.price} BDT</p>
            
        </div>
    )
}

export default Order;