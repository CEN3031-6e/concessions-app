import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Venues from '../../components/User/Venues'
import Vendors from '../../../src/components/User/Vendors'
import Goods from '../../components/User/Goods'
import Search from '../../components/User/Search'
import AddVenueModal from '../../components/Admin/AddVenueModal/AddVenueModal'
import AddVendorModal from '../../components/Admin/AddVendorModal/AddVendorModal'
import ShowGoodModal from '../../components/User/ShowGoodModal/ShowGoodModal'
import ShowCartModal from '../../components/User/ShowCartModal/ShowCartModal'
import ClearCartModal from '../../components/User/ClearCartModal/ClearCartModal'
import ShowOrdersModal from '../../components/User/ShowOrdersModal/ShowOrdersModal'
import {Button} from 'react-bootstrap'
import './User.css'
import axios from 'axios'

class User extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        venues: [],
        selectedVenue: null,
        vendors: [],
        selectedVendor: null,
        goods: [],
        selectedGood: null,

        filter: '',
        cart: [],
        orders: [],

        addingVenue: false,
        addingVendor: false,
        showingGood: false,
        showingCart: false,
        clearingCart: false,
        showingOrders: false,

        posMessage: "",
        negMessage: ""
      };
  }

  returnPage = () => {
      if (this.state.selectedVendor) this.toggleClearCartModal();
      else if (this.state.selectedVenue) this.setState({filter: '', selectedVenue: null});
      else this.props.history.push('/home');
  }
  
  filterUpdate = (event) => this.setState({filter: event.target.value});

  selectVenue = (id) => {
      this.setState({filter: '', selectedVenue: this.state.venues.find((venue) => venue._id === id)});
      this.updateVendors(id);
  }
  deleteVenue = (id) => {
      axios.post('/admin/deleteVenue', {id}).then(res => {
        if (res.data.success) {
          this.updateVenues();
          this.setState({ negMessage: "", posMessage: "Successfully deleted venue." });
        }
        else this.setState({ negMessage: res.data.message, posMessage: "" });
      });
  }

  selectVendor = (id) => {
    this.setState({filter: '', selectedVendor: this.state.vendors.find((vendor) => vendor._id === id)});
    this.updateGoods(this.state.selectedVenue._id, id);
  }
  deleteVendor = (id) => {
    axios.post('/admin/deleteVendor', {venueID: this.state.selectedVenue._id, id}).then(res => {
      if (res.data.success) {
        this.updateVendors(this.state.selectedVenue._id);
        this.setState({ negMessage: "", posMessage: "Successfully deleted vendor." });
      }
      else this.setState({negMessage: res.data.message, posMessage: "" });
    });
  }

  selectGood = (id) => {
    this.setState({selectedGood: this.state.goods.find((good) => good._id === id), showingGood: true })
  }

  updateVenues = () => axios.get('/admin/venues').then(res => this.setState({ venues: res.data.venues }));
  updateVendors = (selectedVenueID) => axios.get('/admin/vendors', {params: {selectedVenueID: selectedVenueID}}).then(res => this.setState({vendors: res.data.vendors }));
  updateGoods = (selectedVenueID, selectedVendorID) => axios.get('/admin/goods', {params: {selectedVenueID: selectedVenueID, selectedVendorID: selectedVendorID}}).then(res => this.setState({goods: res.data.goods}));
  updateOrders = () => axios.get('/users/orders', {params: {userID: this.props.user.id}}).then(res => this.setState({orders: res.data.orders}));

  addGood = (quantity) => {
    const name = this.state.selectedGood.name;
    const price = this.state.selectedGood.price;
    const id = this.state.selectedGood._id;
    const good = {
      id,
      name,
      price,
      quantity
    }
    let cart = this.state.cart;
    cart.push(good);
    this.setState({filter: '', cart: cart, showingGood: false});
  } 
  submitCart = () => {
    let user = {
      id: this.props.user.id,
      name: this.props.user.name,
      email: this.props.user.email
    };
    let vendor = {
      id: this.state.selectedVendor._id,
      name: this.state.selectedVendor.name
    }
    let subtotal = 0.00;
    for (let good of this.state.cart) subtotal += (good.price * good.quantity);

    let order = {
      user,
      venueID: this.state.selectedVenue._id,
      vendor,
      cart: this.state.cart,
      subtotal,
      completed: false
    };

    axios.post('/users/addOrder', order).then(res => {
      if (res.data.success) {
        this.toggleShowCartModal();
        this.setState({ cart: [], negMessage: "", posMessage: "Successfully submitted cart." });
        this.updateOrders();
      } else this.setState({ negMessage: "Error submitting cart.", posMessage: "" });
    })
  }
  clearCart= () => this.setState({filter: '', selectedVendor: null, goods: [], cart: [], clearingCart: false});

  toggleAddVenueModal = () => this.setState({ addingVenue: !this.state.addingVenue });
  toggleAddVendorModal = () => this.setState({ addingVendor: !this.state.addingVendor });
  toggleShowGoodModal = () => this.setState({ showingGood: !this.state.showingGood });
  toggleShowCartModal = () => this.setState({ showingCart: !this.state.showingCart });
  toggleClearCartModal = () => this.setState({ clearingCart: !this.state.clearingCart });
  toggleShowOrdersModal = () => this.setState({ showingOrders: !this.state.showingOrders });


  componentDidMount = () => {
    this.updateVenues();
    this.updateVendors();
    this.updateGoods();
    this.updateOrders();
  }

  render() {
    if (!this.props.loggedIn) return <Redirect to="/login"/>
    let adminPriv = (this.props.loggedIn && (this.props.user.email === 'cen3031@ufl.edu'));
    let username = this.props.loggedIn ? this.props.user.name : 'error';

    let page = <p>Uh-oh! Looks like we got lost some where. Try refreshing the page :)</p>;
    if (this.state.selectedVendor) {
      page = (
        <div>
          <h1>{this.state.selectedVendor.name}</h1>
          <Goods 
            selectedVendor={this.state.selectedVendor} 
            selectGood={this.selectGood.bind(this)} 
            filter={this.state.filter}
          />
        </div>
      );
    } else if (this.state.selectedVenue) {
      page = (
        <div>
          <h1>{this.state.selectedVenue.name}</h1>
          <Vendors 
            vendors={this.state.vendors} 
            selectVendor={this.selectVendor.bind(this)} 
            deleteVendor={this.deleteVendor.bind(this)}
            filter={this.state.filter}
            adminPriv={adminPriv}
            openModal={this.toggleAddVendorModal.bind(this)}/>
        </div>
      );
    } else {
      page = (
        <div>
          <h1>Venues</h1>
          <Venues 
            venues={this.state.venues} 
            selectVenue={this.selectVenue.bind(this)} 
            deleteVenue={this.deleteVenue.bind(this)}
            filter={this.state.filter} 
            adminPriv={adminPriv}
            openModal={this.toggleAddVenueModal.bind(this)}/>
        </div>
      );
    }

    return (
      <div className="">
        {this.state.addingVenue ? <AddVenueModal show={true} addVenue={this.updateVenues.bind(this)} modalClose={this.toggleAddVenueModal.bind(this)}/> : null}
        {this.state.addingVendor ? <AddVendorModal show={true} selectedVenue={this.state.selectedVenue} addVendor={this.updateVendors.bind(this)} modalClose={this.toggleAddVendorModal.bind(this)}/> : null}
        {this.state.showingGood ? <ShowGoodModal show={true} good={this.state.selectedGood} addGood={this.addGood.bind(this)} modalClose={this.toggleShowGoodModal.bind(this)} /> : null}
        {this.state.showingCart ? <ShowCartModal show={true} cart={this.state.cart} submitCart={this.submitCart.bind(this)} modalClose={this.toggleShowCartModal.bind(this)} /> : null}
        {this.state.clearingCart ? <ClearCartModal show={true} clearCart={this.clearCart.bind(this)} modalClose={this.toggleClearCartModal.bind(this)} /> : null}
        {this.state.showingOrders ? <ShowOrdersModal show={true} orders={this.state.orders} modalClose={this.toggleShowOrdersModal.bind(this)} /> : null}
        <header className="app-header">
          <center>
          <h3>Welcome, {username}</h3>
          <Button className="user-button" onClick={this.returnPage.bind(this)}>Return</Button>
          {this.state.selectedVendor ? <Button className="user-button" onClick={this.toggleShowCartModal.bind(this)}>My Cart</Button> : null}
          <Button className="user-button" onClick={this.toggleShowOrdersModal.bind(this)}>My Orders</Button>
          <Search filterValue={this.state.filter} filterUpdate={this.filterUpdate.bind(this)}/>
          <p className="pos-message">{this.state.posMessage}</p>
          <p className="neg-message">{this.state.negMessage}</p>
          </center>
        </header>
        {page}
      </div>
    );
  }
}

export default withRouter(User);
