import React from 'react'
import '../../views/User/User.css'
import { Redirect, withRouter } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import FormControl from 'react-bootstrap/FormControl'
import { Row, Col, Grid } from 'react-bootstrap';
import axios from 'axios'


class Checkout extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        card: false,
        pay: false,
        deleteG: [],
        please: 0,
        notify: false,
        finish: false,
        cart: this.props.submittedOrder.cart,
        subtotal: this.props.submittedOrder.subtotal,
      }

      this.paypal = this.paypal.bind(this);
  }

  addCard = () => {
    this.setState({ card:!this.state.card });
  }

  clearCart = () => this.props.clearCart();

  submitpay = () => {
    this.setState({ pay:!this.state.pay });
  }

  deletingG = (id) =>{
    this.setState({ please: this.state.cart.findIndex(good => good.id === this.state.deleteG[0]) });
  }

  deleted = () => {
    let newSubtotal = this.state.subtotal;
    newSubtotal -= (this.state.cart[this.state.please].quantity * this.state.cart[this.state.please].price);
    let newCart = this.state.cart;
    newCart.slice(this.state.please, 1);

    this.setState({ cart: newCart, subtotal: newSubtotal, notify:true });
  }

  payOrder = () => {
    this.setState({ finish:true });
  }
    
    
  paypal = () => {
    axios.post('/users/pay', {subtotal: this.state.subtotal}).then(res => {
      console.log('returns from backend');
      //window.location.assign(url);
      window.open(res.data.paypal_url);
    });
  }
    

render() {
    return (
      <div>
        {this.state.finish ?
        <h1 style={{backgroundColor: 'white'}}>PAYMENT SUCCESSFUL! Press Return to go back to homepage</h1> :null}
          <Card  style={{backgroundColor: 'lightblue'}}>
            <Card.Header>CHECKOUT</Card.Header>
              {this.state.notify ?
              <Card.Title style={{backgroundColor: 'white'}}> Item has been deleted.</Card.Title>:null}
            <Card.Body>

              <Card.Text>
                <ListGroup>
                    {this.state.cart.map((good) =>
                        <ListGroup.Item key={good.id} onClick={()=>{this.deletingG(good.id)}} variant="light">{good.name} x{good.quantity} - ${(good.price*good.quantity).toFixed(2)}</ListGroup.Item>)}
                        <ListGroup.Item >SUBTOTAL: ${this.state.subtotal.toFixed(2)}</ListGroup.Item>
                </ListGroup>

              </Card.Text>
            </Card.Body>
          </Card>
        <div>
          <Button style={{position: 'absolute',  textAlign:'center',
          right:770, backgroundColor: 'red'}} id={'delete'} onClick={this.deleted.bind(this)}>Delete</Button>
          <Button style={{position: 'absolute',  textAlign:'center',
          right:620,backgroundColor: 'skyblue'}} onClick={this.addCard} > Link your card </Button>
          <Button style={{position: 'absolute',  textAlign:'center',
          right:470,backgroundColor: 'skyblue'}}  onClick={this.paypal}> Pay for Order </Button>  
        {/* {this.state.pay ?
          <Button style={{position: 'absolute',
          right:500}} onClick={()=>{this.payOrder();this.clearCart()}}> Pay for Order </Button>:null} */}
        {this.state.card ?
          <center>
          <Form style={{position: 'absolute',  textAlign:'center',
          left:400, bottom:0}}>
          <Card style={{backgroundColor: 'skyblue'}}>
                <Form.Label>ADD CARD</Form.Label>
                <Form.Control placeholder="Full name" />
                <Form.Control placeholder="Card Number" />
                <Row>
                <Col>
                  <Form.Label>Valid Thru</Form.Label>
                  <Form.Control placeholder="00/00" />
                  </Col>
                  <Col>
                  <Form.Label>CVC</Form.Label>
                  <Form.Control placeholder="CVC" />
                  </Col>
                  </Row>
                  <Button onClick={()=>{this.addCard();this.submitpay();}}>
                      Submit
                      </Button>
                        </Card>
          </Form>
          </center>
          : ' '}
        </div>
      </div>
    )
  }
}

export default withRouter(Checkout);
