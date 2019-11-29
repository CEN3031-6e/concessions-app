import React from 'react'
import '../../views/User/User.css'
import {Button} from 'react-bootstrap'

export default (props) => {
    return (
        props.show ? 
            <Button
                className="return-button"
                onClick={()=>{props.toggleCart()}}
            >My Cart</Button> 
        : null
    );
}
