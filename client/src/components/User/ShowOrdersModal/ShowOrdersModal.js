import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {Button} from 'react-bootstrap'
import './ShowOrdersModal.css'

class ShowOrdersModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showCompleted: false
        };
    }

    showActive = () => this.setState({ showCompleted: false });
    showCompleted = () => this.setState({ showCompleted: true });
    modalClose = () => this.props.modalClose();

    render() {
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.modalClose.bind(this)}/>
                <div 
                    className='ShowOrdersModal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <center>
                    <h1>Your Orders</h1>
                    <Button className="show-order-btn" active={!this.state.showCompleted} onClick={this.showActive.bind(this)}>Active Orders</Button>
                    <Button className="show-order-btn" active={this.state.showCompleted} onClick={this.showCompleted.bind(this)}>All Orders</Button>
                    {this.props.orders ? this.props.orders.map((order) => {
                        if (!this.state.showCompleted && order.completed) return null;
                        return (
                            <div key={order._id}>{order.vendorName} -${order.subtotal.toFixed(2)}</div>
                        );
                    }) : null}
                    </center>
                </div>
            </div>
        );
    }
}

export default ShowOrdersModal;