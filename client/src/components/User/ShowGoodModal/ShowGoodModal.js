import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import './ShowGoodModal.css'

class ShowGoodModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
        }
    }

    increaseQuantity = () => {
        if (this.state.quantity >= this.props.good.quantity) this.setState({quantity: this.props.good.quantity});
        else this.setState({quantity: this.state.quantity + 1});
    }

    decreaseQuantity = () => {
        if (this.state.quantity <= 0) this.setState({quantity: 0});
        else this.setState({quantity: this.state.quantity - 1});
    }

    addGood = () => {
        this.setState({quantity: 1});
        if (this.state.quantity > 0) this.props.addGood(this.state.quantity);
        else this.props.modalClose();
    }

    modalClose = () => {
        this.setState({quantity: 1});
        this.props.modalClose();
    }

    render() {
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.modalClose.bind(this)}/>
                <div 
                    className='ShowGoodModal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <center>
                        <h3>{this.props.good ? this.props.good.name : "Err"}</h3>
                        <h4>Quantity: {this.state.quantity}</h4>
                        <button onClick={this.increaseQuantity.bind(this)}>+</button>
                        <button onClick={this.decreaseQuantity.bind(this)}>-</button>
                        <br/>
                        <button onClick={this.addGood.bind(this)}>Add to Cart</button>
                        <button onClick={this.modalClose.bind(this)}>Cancel</button>
                    </center>
                </div>
            </div>
        );
    }
}

export default ShowGoodModal;