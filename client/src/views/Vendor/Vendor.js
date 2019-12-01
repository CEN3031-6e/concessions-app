import React from 'react'
import axios from 'axios'
import AddGoodModal from '../../components/Vendor/AddGoodModal/AddGoodModal'
import ShowOrderModal from '../../components/Vendor/ShowOrderModal/ShowOrderModal'
import './Vendor.css'

class Vendor extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            filter: '',
            goods: [],
            orders: [],
            goodsPage: true,
            addingGood: false,
            showingOrder: false,
            selectedOrder: null,

            negMessage: "",
            posMessage: ""
        };
    }

    viewOrder = (e) => {
        this.setState({showingOrder: true, selectedOrder: this.state.orders.find((order) => order._id === e.currentTarget.getAttribute('id'))});
    }
    completeOrder = (id) => {
        const order = {
            userID: this.state.orders.find((order) => order._id === id).userID,
            venueID: this.props.vendor.venueID,
            vendorID: this.props.vendor.linkedID,
            orderID: id
        };
        axios.post('/vendors/completeOrder', order).then(res => {
            if (res.data.success) {
                this.updateOrders();
                this.setState({ showingOrder: false, negMessage: "", posMessage: "Successfully completed order." });
            } else this.setState({ negMessage: "Unable to complete order.", posMessage: "" });
        });
    }

    setGoodsPage = () => this.setState({goodsPage: true});
    setOrdersPage = () => this.setState({goodsPage: false});

    toggleAddGoodModal = () => this.setState({ addingGood: !this.state.addingGood }); 
    toggleShowOrderModal = () => this.setState({ showingOrder: !this.state.showingOrder });

    updateGoods = () => axios.get('/vendors/goods', {params: {venueID: this.props.vendor.venueID, linkedID: this.props.vendor.linkedID}}).then(res => this.setState({ goods: res.data.goods }));
    updateOrders = () => axios.get('/vendors/orders', {params: {venueID: this.props.vendor.venueID, linkedID: this.props.vendor.linkedID}}).then(res => this.setState({ orders: res.data.orders }));

    componentDidMount = () => {
        this.updateGoods();
        this.updateOrders();
    }

    render() {
        let goods = <ul>{this.state.goods.map((good) => {
            return (
                <li key={good._id}>
                    <h3>{good.name} - ${good.price.toFixed(2)}</h3>
                    <p>Quantity: {good.quantity}</p>
                </li>
            )
        })}</ul>;
        let addGood = <button onClick={this.toggleAddGoodModal.bind(this)}>Add Good</button>

        let orders = <ul>{this.state.orders
        .map((order) => {
            return !order.completed ? (
                <div key={order._id}>
                    <h3>{order.userName} - ${order.subtotal.toFixed(2)}</h3>
                    <button id={order._id} onClick={this.viewOrder.bind(this)}>View Order</button>
                    <button id={order._id} onClick={e => this.completeOrder(e.currentTarget.getAttribute('id'))}>Complete Order</button>
                </div>
            ) : null;
        })}</ul>

        return (
            <div>
                <AddGoodModal show={this.state.addingGood} vendor={this.props.vendor} addGood={this.updateGoods.bind(this)} modalClose={this.toggleAddGoodModal.bind(this)}/>
                <ShowOrderModal show={this.state.showingOrder} order={this.state.selectedOrder} completeOrder={this.completeOrder.bind(this)} modalClose={this.toggleShowOrderModal.bind(this)} />
                <header className="app-header">
                  <h1>{this.props.vendor.name}</h1>
                  <button onClick={this.setGoodsPage.bind(this)}>Goods</button>
                  <button onClick={this.setOrdersPage.bind(this)}>Orders</button>
                </header>
                <p className="neg-message">{this.state.negMessage}</p>
                <p className="pos-message">{this.state.posMessage}</p>
                {this.state.goodsPage ? <div><h3>Goods</h3>{goods}{addGood}</div> : <div><h3>Orders</h3>{orders}</div>}
            </div>
        );
    }
}

export default Vendor;
