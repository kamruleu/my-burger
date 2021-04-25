import React from 'react';
import { Card, CardHeader, CardFooter, CardBody, Button } from 'reactstrap';

const controls = [
    { lavel: 'Salad', type: 'salad' },
    { lavel: 'Cheese', type: 'cheese' },
    { lavel: 'Meat', type: 'meat' }
]

const BuildControl = (props) => {
    return (
        <div className="d-flex">
            <div className="mr-auto ml-5" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.lavel}</div>
            <Button className="btn btn-danger btn-sm m-1" onClick={props.removed}>-</Button>
            <Button className="btn btn-success btn-sm m-1" onClick={props.added}>+</Button>
        </div>
    )
}

const Controls = (props) => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{
                    backgroundColor: "#D70F64",
                    color: "white",
                }}><h4>Add Ingredients</h4></CardHeader>
                <CardBody>
                    {controls.map(item => {
                        return <BuildControl
                            lavel={item.lavel}
                            type={item.type}
                            key={Math.random()}
                            added={() => props.addIngedient(item.type)}
                            removed={() => props.removeIngedient(item.type)}
                        />
                    })}
                </CardBody>
                <CardFooter>Price: <strong>{props.price}</strong> BDT</CardFooter>
                <Button style={{backgroundColor: "#D70F64"}} disabled={!props.purchaseable} onClick={props.toggleModal}>Checkout</Button>
            </Card>
        </div>
    )
}

export default Controls;