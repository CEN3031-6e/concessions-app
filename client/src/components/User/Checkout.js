import React from 'react'
import '../../views/User/User.css'
import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

export default (props) => {

       let subtotal = 0;
       for (let good of props.cart) {
           subtotal += (good.price * good.quantity);
       }


    return (

      <div>
          <Card  style={{backgroundColor: 'lightblue'}}>
            <Card.Header>CHECKOUT</Card.Header>
            <Card.Body>

              <Card.Text>
                <ListGroup>
                    {props.cart.map((good) =>

                        <ListGroup.Item variant="light">{good.name} x{good.quantity} - ${(good.price*good.quantity).toFixed(2)}</ListGroup.Item>)}
                        <ListGroup.Item >SUBTOTAL: ${subtotal.toFixed(2)}</ListGroup.Item>
                </ListGroup>

              </Card.Text>
            </Card.Body>
          </Card>
        <div>
          <Button style={{position: 'absolute',  textAlign:'center',
          right:800}}> Link your card </Button>
          <Button style={{position: 'absolute',
          right:650}}> Pay for Order </Button>


        </div>
      </div>
    )


}
