import React from 'react'
import '../../views/User/User.css'
import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

export default (props) => {

       let subtotal = 0;


    return (

      <div>
          <Card>
            <Card.Header>CHECKOUT</Card.Header>
            <Card.Body>
            
              <Card.Text>
                <ul>
                    {props.cart.map((good) => <li>{good.name} x{good.quantity} - ${(good.price*good.quantity).toFixed(2)}</li>)}
                </ul>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        <p>This is your stuff</p>
        <div>
          <Button> Link your card </Button>
          <Button> Pay for Order </Button>


        </div>
      </div>
    )


}
