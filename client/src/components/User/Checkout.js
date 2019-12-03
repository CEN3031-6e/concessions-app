import React from 'react'
import '../../views/User/User.css'
import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

class Checkout extends React.Component {

  constructor(props) {
      super(props);
      this.paypal = this.paypal.bind(this);
      this.state = {
        link: ''
      }
  }

       

    paypal() {

      let cart = this.props.cart;

      let subtotal = 0;
       for (let good of this.props.cart) {
           subtotal += (good.price * good.quantity);
       }
        
      axios.post('/users/pay', {subtotal: subtotal}).then(res => {
          console.log('returns from backend');
          //window.location.assign(url);
          window.open(res.data.paypal_url);

      });
  }

    render() {


      let subtotal = 0;
       for (let good of this.props.cart) {
           subtotal += (good.price * good.quantity);
       }

      return (

        <div>
            <Card  style={{backgroundColor: 'lightblue'}}>
              <Card.Header>CHECKOUT</Card.Header>
              <Card.Body>

                <Card.Text>
                  <ListGroup>
                      {this.props.cart.map((good) =>

                          <ListGroup.Item variant="light">{good.name} x{good.quantity} - ${(good.price*good.quantity).toFixed(2)}</ListGroup.Item>)}
                          <ListGroup.Item >SUBTOTAL: ${subtotal.toFixed(2)}</ListGroup.Item>
                  </ListGroup>

                </Card.Text>
              </Card.Body>
            </Card>
          <div>
            <Button style={{position: 'absolute',  textAlign:'center',
            right:800}}> Link your card </Button>
            <button style={{position: 'absolute',
            right:650}} onClick={this.paypal}> Pay for Order </button>


          </div>
        </div>
      );
    }
    
}

export default Checkout;