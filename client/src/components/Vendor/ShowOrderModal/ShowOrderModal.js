import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {Button} from 'react-bootstrap'
import './ShowOrderModal.css'

class ShowOrderModal extends React.Component {

    modalClose = () => this.props.modalClose();

    //Display an order with its associated information and buttons
    render() {

        let page = this.props.order ? (
            <div>
                <Backdrop show={this.props.show} clicked={this.modalClose.bind(this)}/>
                <div 
                    className='ShowOrderModal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <center>
                        <h3>{this.props.order.userName}</h3>
                        <h4>{this.props.order.userEmail}</h4>
                        {this.props.order.cart.map((good) => {
                            return <div key={good._id}>{good.name} x{good.quantity} - ${good.price.toFixed(2)}</div>
                        })}
                        <br />
                        <p>Subtotal: ${this.props.order.subtotal.toFixed(2)}</p>
                        <Button className="vendor-page-button" variant="success" onClick={_ => this.props.completeOrder(this.props.order._id)}>Complete Order</Button>
                        <Button className="vendor-page-button" variant="danger" onClick={() => this.props.cancelOrder(this.props.order._id)}>Cancel Order</Button>
                    </center>
                </div>
            </div>
        ) : null;
        return page;
    }
}

export default ShowOrderModal;