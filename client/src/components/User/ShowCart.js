import React from 'react'
import '../../views/User/User.css'
import {Button} from 'react-bootstrap'

export default (props) => {
    return (
        <Button
            className="cart-button"
            onClick={props.showCart}
        >My Cart</Button>
    )
}