import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import './ClearCartModal.css'

class ClearCartModal extends React.Component {

    modalClose = () => {
        this.props.modalClose();
    }

    clearCart = () => {
        this.props.clearCart();
    }

    render() {
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.modalClose.bind(this)}/>
                <div 
                    className='ClearCartModal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <center>
                        <p>Are you sure you want to go back? Going back will clear your cart.</p>
                        <button onClick={this.clearCart.bind(this)}>Yes</button>
                        <button onClick={this.modalClose.bind(this)}>No</button>
                    </center>
                </div>
            </div>
        );
    }
}

export default ClearCartModal;