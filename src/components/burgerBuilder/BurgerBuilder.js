import React, { Component } from 'react';
import Burger from './burger/Burger';
import Controls from './controls/Controls';
import Summary from './summary/Summary';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPice: state.totalPice,
        purchaseable: state.purchaseable
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        updatePurchasable: () => dispatch(updatePurchasable())
        
    }
}
class BurgerBuilder extends Component {
    state = {
        modalOpen: false
    }

    addIngedientHandle = (type) => {
        this.props.addIngredient(type);
        this.props.updatePurchasable();
        // console.log(type);
    }

    removeIngedientHandle = (type) => {
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
        //console.log(type);
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    checkoutHandler = () => {
        this.props.history.push("checkout");
    }

    // componentDidMount = () => {
    //     console.log(this.props);
    // }

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        addIngedient={this.addIngedientHandle}
                        removeIngedient={this.removeIngedientHandle}
                        price={this.props.totalPice}
                        toggleModal={this.toggleModal}
                        purchaseable={this.props.purchaseable}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Details</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{backgroundColor: "#D70F64"}} onClick={this.checkoutHandler}>Continue to checkout</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);