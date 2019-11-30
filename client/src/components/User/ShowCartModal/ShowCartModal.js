import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import './ShowCartModal.css'

class ShowCartModal extends React.Component {

    modalClose = () => {
        this.props.modalClose();
    }

    submitCart = () => {
        this.props.submitCart();
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
                    <ul>
                        {this.props.cart.map((good) => <li>{good.name} x{good.quantity} - ${(good.price*good.quantity).toFixed(2)}</li>)}
                    </ul>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <button onClick={this.submitCart.bind(this)}>Submit Cart</button>
                    </center>
                </div>
            </div>
        );
    }
}

export default ShowCartModal;
