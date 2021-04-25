import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../../redux/ActionCreators';
import Order from './checkout/order/Order';
import Spinner from '../../spinner/Spinner';

const mapStateToProps = (state) => {
    return{
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        fetchOrders: () => dispatch(fetchOrders())
    }
}

class Orders extends Component {

    componentDidMount(){
        this.props.fetchOrders();
    }
    componentDidUpdate(){
        //console.log(this.props);
    }
    render(){
        let orders = null;
        if(this.props.orderErr){
            orders = <p style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                padding: "20px",
                borderRadius: "5px",
                marginBottom: "10px"
            }}>Sorry! Failed to load orders!</p>;
        }else{
            if(this.props.orders.length === 0){
                orders = <p style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    padding: "20px",
                    borderRadius: "5px",
                    marginBottom: "10px"
                }}>Sorry! You have no Order!</p>;
            }else{
                orders = this.props.orders.map(order => {
                    return(
                        <Order order={order} key={order.id} />
                    )
                })
            }
            
        }
        
        return(
            <div>
                {this.props.orderLoading? <Spinner /> : orders}
            </div>
        )
    }
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);