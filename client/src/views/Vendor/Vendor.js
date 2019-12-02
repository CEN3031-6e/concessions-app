import React from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import AddGoodModal from '../../components/Vendor/AddGoodModal/AddGoodModal'
import ShowOrderModal from '../../components/Vendor/ShowOrderModal/ShowOrderModal'
import DeleteGoodModal from '../../components/Vendor/DeleteGoodModal/DeleteGoodModal'
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
            deletingGood: false,
            showingOrder: false,

            selectedGood: null,
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
            } else this.setState({ showingOrder: false, negMessage: "Unable to complete order.", posMessage: "" });
        });
    }
    cancelOrder = (id) => {
        axios.post('/vendors/cancelOrder', {id}).then(res => {
            if (res.data.success) {
                this.updateOrders();
                this.setState({ showingOrder: false, negMessage: "", posMessage: "Successfully cancelled order." });
            } else this.setState({ showingOrder: false, negMessage: "Unable to complete order.", posMessage: "" });
        })
    }

    deleteGood = (good) => this.setState({ deletingGood: true, selectedGood: good });

    setGoodsPage = () => this.setState({ goodsPage: true });
    setOrdersPage = () => this.setState({ goodsPage: false });

    setNegMessage = (msg) => this.setState({ negMessage: msg });
    setPosMessage = (msg) => this.setState({ posMessage: msg });

    toggleAddGoodModal = () => this.setState({ addingGood: !this.state.addingGood }); 
    toggleShowOrderModal = () => this.setState({ showingOrder: !this.state.showingOrder });
    toggleDeleteGoodModal = () => this.setState({ deletingGood: !this.state.deletingGood });
    
    updateGoods = () => axios.get('/vendors/goods', {params: {venueID: this.props.vendor.venueID, linkedID: this.props.vendor.linkedID}}).then(res => this.setState({ goods: res.data.goods }));
    updateOrders = () => axios.get('/vendors/orders', {params: {venueID: this.props.vendor.venueID, linkedID: this.props.vendor.linkedID}}).then(res => this.setState({ orders: res.data.orders }));

    componentDidMount = () => {
        this.updateGoods();
        this.updateOrders();
    }

    render() {
     let goods = this.state.goods.map((good) => {
            return (
                <div className="list-item" key={good._id}>
                    <h3>{good.name} - ${good.price.toFixed(2)}</h3>
                    <p>Quantity: {good.quantity}</p>
                     <Button className="vendor-page-button" variant="danger" onClick={() => this.deleteGood(good)}>Delete good</Button>
                </div>
            )
        })
        let addGood = <Button className="vendor-page-button" variant="success" onClick={this.toggleAddGoodModal.bind(this)}>Add Good</Button>

        let orders = this.state.orders
        .map((order) => {
            return !order.completed ? (
                <div className="list-item" key={order._id}>
                    <h3>{order.userName} - ${order.subtotal.toFixed(2)}</h3>
                    <Button className="vendor-page-button" id={order._id} onClick={this.viewOrder.bind(this)}>View Order</Button>
                    <Button className="vendor-page-button" id={order._id} onClick={e => this.completeOrder(e.currentTarget.getAttribute('id'))}>Complete Order</Button>
                </div>
            ) : null;
        })

        return (
            <div>
                {this.state.deletingGood ? <DeleteGoodModal show={true} vendor={this.props.vendor} good={this.state.selectedGood} deleteGood={this.updateGoods.bind(this)} setNegMessage={this.setNegMessage.bind(this)} setPosMessage={this.setPosMessage.bind(this)} modalClose={this.toggleDeleteGoodModal.bind(this)}/> : null}
                {this.state.addingGood ? <AddGoodModal show={true} vendor={this.props.vendor} addGood={this.updateGoods.bind(this)} setNegMessage={this.setNegMessage.bind(this)} setPosMessage={this.setPosMessage.bind(this)} modalClose={this.toggleAddGoodModal.bind(this)}/> : null}
                {this.state.showingOrder ? <ShowOrderModal show={true} order={this.state.selectedOrder} completeOrder={this.completeOrder.bind(this)} cancelOrder={this.cancelOrder.bind(this)} modalClose={this.toggleShowOrderModal.bind(this)} /> : null}
                <header className="app-header">
                  <h1>{this.props.vendor.name}</h1>
                <Button className="vendor-page-button" onClick={this.setGoodsPage.bind(this)} active={this.state.goodsPage}>Goods</Button>
                <Button className="vendor-page-button" onClick={this.setOrdersPage.bind(this)} active={!this.state.goodsPage}>Orders</Button>
                </header>
                <p className="neg-message">{this.state.negMessage}</p>
                <p className="pos-message">{this.state.posMessage}</p>
                {this.state.goodsPage ? <div><h3>Goods</h3>{goods}{addGood}</div> : <div><h3>Orders</h3>{orders}</div>}
            </div>
        );
    }
}

export default Vendor;