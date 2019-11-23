import React from 'react'
import '../../views/User/User.css'

export default (props) => {
    return (
        <button
            className="cart-button"
            onClick={()=>{props.showCart();props.showOnOff()}}
        >My Cart</button>
    )
}
