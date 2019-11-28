import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import './ShowOrderModal.css'

class ShowOrderModal extends React.Component {

    modalClose = () => {
        this.props.modalClose();
    }

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
                        <h4>{this.props.order.userID}</h4>
                        <ul>
                            {this.props.order.cart.map((good) => {
                                return <li>{good.name} x{good.quantity} - ${good.price.toFixed(2)}</li>
                            })}
                        </ul>
                        <p>${this.props.order.subtotal.toFixed(2)}</p>
                        <button onClick={_ => this.props.completeOrder(this.props.order._id)}>Complete Order</button>
                    </center>
                </div>
            </div>
        ) : null;
        return page;
    }
}

export default ShowOrderModal;