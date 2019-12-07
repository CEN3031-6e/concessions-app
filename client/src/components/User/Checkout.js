import React from 'react'
import '../../views/User/User.css'
import { withRouter } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'


class Checkout extends React.Component {

  //Selecting Clear Cart returns you to the Goods page with a cleared cart
  clearCart = () => this.props.clearCart();
    
  //Selecting Pay for Order takes you to a PayPal external link where you can pay for your order
  paypal = () => axios.post('/users/pay', {subtotal: this.props.submittedOrder.subtotal}).then(res => {window.open(res.data.paypal_url)});

  render() {
    return (
      <div>
        <Card  style={{backgroundColor: 'lightblue'}}>
          <Card.Header>CHECKOUT</Card.Header>
          <Card.Body>
            <Card.Text>
              <ListGroup>
                  {this.props.submittedOrder.cart.map((good) => <ListGroup.Item key={good.id} variant="light">{good.name} x{good.quantity} - ${(good.price*good.quantity).toFixed(2)}</ListGroup.Item>)}
                  <ListGroup.Item >SUBTOTAL: ${this.props.submittedOrder.subtotal.toFixed(2)}</ListGroup.Item>
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
        <div>
          <Button style={{position: 'absolute',  textAlign:'center',
          left: 520, backgroundColor: 'red'}} id={'delete'} onClick={this.clearCart.bind(this)}>Clear Cart</Button>
          <Button style={{position: 'absolute',  textAlign:'center',
          right: 520,backgroundColor: 'skyblue'}}  onClick={this.paypal.bind(this)}> Pay for Order </Button>      
        </div>
      </div>
    );
  }
}

export default withRouter(Checkout);
