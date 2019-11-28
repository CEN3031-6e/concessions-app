import React from 'react'
import '../../views/User/User.css'

export default (props) => {
    return (
        props.show ? 
            <button
                className="cart-button"
                onClick={()=>{props.toggleCart()}}
            >My Cart</button> 
        : null
    );
}
