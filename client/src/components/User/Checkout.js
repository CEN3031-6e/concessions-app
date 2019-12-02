import React from 'react'
import '../../views/User/User.css'
import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import FormControl from 'react-bootstrap/FormControl'
import { Row, Col, Grid } from 'react-bootstrap';

class Checkout extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        card: false,
      }
  }
    addCard=()=>{
    this.setState({card:!this.state.card})
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
          right:800}} onClick={this.addCard}> Link your card </Button>
          <Button style={{position: 'absolute',
          right:650}}> Pay for Order </Button>
        {this.state.card ?

          <Form style={{position: 'absolute',  textAlign:'center',
          left:400, bottom:0}}>
          <Card style={{backgroundColor: 'Aquamarine'}}>
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
                  <Button onClick={this.addCard}>
                      Submit
                      </Button>
                        </Card>
          </Form>

          : ' '}
        </div>


      </div>
    )
}

}
export default Checkout;
