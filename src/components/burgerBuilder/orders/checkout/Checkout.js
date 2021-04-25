import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner.js';
import { resetIngredient } from '../../../../redux/ActionCreators';
import axios from 'axios';

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPice,
        purchaseable: state.purchaseable
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetIngredient: () => dispatch(resetIngredient())
    }
}
class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery"
        },
        isLoading: false,
        modalOpen: false,
        modalMsg: ""
    }

    goBack = () => {
        this.props.history.goBack("/");
    }

    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = () => {
        this.setState({
            isLoading: true
        })
        const orders = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date()
        }
        axios.post("https://my-burger-8d430.firebaseio.com/orders.json", orders)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        modalOpen: true,
                        modalMsg: "Order Plased successfully!"
                    })
                    this.props.resetIngredient();
                } else {
                    this.setState({
                        isLoading: false,
                        modalOpen: true,
                        modalMsg: "Somthing error! please try again!"
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    modalOpen: true,
                    modalMsg: "Somthing error! please try again!"
                })
            })
    }

    render() {
        let form = (<div>
            <h4 style={{
                border: "1px solid gray",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px"
            }}>Payment: {this.props.totalPrice} BDT</h4>
            <form style={{
                border: "1px solid gray",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px"
            }}>
                <textarea name="deliveryAddress" className="form-control" placeholder="Your Address" value={this.state.values.deliveryAddress} onChange={(e) => this.inputChangeHandler(e)} />
                <br />
                <input name="phone" className="form-control" placeholder="Your Phone" value={this.state.values.phone} onChange={(e) => this.inputChangeHandler(e)} />
                <br />
                <select name="paymentType" className="form-control" value={this.state.values.paymentType} onChange={(e) => this.inputChangeHandler(e)} >
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Bkash">Bkash</option>
                </select>
                <br />
                <Button className="mr-auto" style={{ backgroundColor: "#D70F64" }} onClick={this.submitHandler} disabled={!this.props.purchaseable} >Place Order</Button>
                <Button className="ml-1" color="secondary" onClick={this.goBack}>Cancel</Button>
            </form>
        </div>);
        return (
            <div>
                { this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.modalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);