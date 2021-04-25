import React from 'react';

const Summary = (props) => {
    const ingredientSummary= props.ingredients.map((item) => {
        return(
            <li key={item.type} style={{textTransform: "capitalize"}}>
                {item.type} : {item.amount}
            </li>
        )
    })
    return(
        <div>
            <ul>
                {ingredientSummary}
            </ul>
        </div>
    )
}
export default Summary;