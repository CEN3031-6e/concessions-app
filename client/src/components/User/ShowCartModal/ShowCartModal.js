import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {Button} from 'react-bootstrap'
import './ShowCartModal.css'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

class ShowCartModal extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          deleteG:[],
          please :0,
          notify: false,
          cart: this.props.cart

      }
  }

    modalClose = () => this.props.modalClose();

    submitCart = () => this.props.submitCart();

    clearCart = () => this.props.clearCart();

    deletingG = (id) =>{
      this.state.please= this.props.cart.findIndex(good => good.id === this.state.deleteG[0])

        }

      deleted =()=>{
        this.props.cart.splice(this.state.please,1)
        this.setState({notify:true})
      }
    render() {

        let subtotal = 0;
        for (let good of this.props.cart) {
            subtotal += (good.price * good.quantity);
        }

        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.modalClose.bind(this)}/>
                <div
                    className='ShowCartModal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <center>
                    <h1>This is your cart</h1>
                    {this.state.notify ?
                    <p style={{backgroundColor: 'white'}}> Item has been deleted.</p>:null}
                      <ListGroup>
                        {this.props.cart.map((good) => <ListGroup.Item key={good.id} onClick={()=>{this.deletingG(good.id)}}  ><div key={good.id}>{good.name} x{good.quantity} - ${(good.quantity * good.price).toFixed(2)}</div></ListGroup.Item >)}
                      </ListGroup>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <Button id={'submit'} onClick={this.submitCart.bind(this)}>Submit Cart</Button>
                    <Button id={'return'} onClick={this.modalClose.bind(this)}>Return</Button>
                    <Button id={'clear'} onClick={this.clearCart.bind(this)}>Clear Cart</Button>
                    <Button id={'delete'} style={{backgroundColor: 'red'}} onClick={this.deleted.bind(this)}>Delete</Button>
                    </center>
                </div>

            </div>
        );
    }
}

export default ShowCartModal;
