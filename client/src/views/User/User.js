import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Venues from '../../components/User/Venues'
import Vendors from '../../../src/components/User/Vendors'
import Goods from '../../components/User/Goods'
import Cart from '../../components/User/Cart'
import Return from '../../components/User/Return'
import ShowCart from '../../components/User/ShowCart'
import Search from '../../components/User/Search'
import Checkout from '../../components/User/Checkout'
import AddVenueModal from '../../components/Admin/AddVenueModal/AddVenueModal'
import AddVendorModal from '../../components/Admin/AddVendorModal/AddVendorModal'
import ShowGoodModal from '../../components/User/ShowGoodModal/ShowGoodModal'
import ShowCartModal from '../../components/User/ShowCartModal/ShowCartModal'
import ClearCartModal from '../../components/User/ClearCartModal/ClearCartModal'
import ShowOrdersModal from '../../components/User/ShowOrdersModal/ShowOrdersModal'
import './User.css'
import {Row} from 'react-bootstrap'
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
        showingCart: false,
        clearingCart: false,
        showingOrders: false,
        checkout: false
      };


  }
  returnPage() {
      if (this.state.selectedVendor) {
        this.toggleClearCartModal();
      }
      else if (this.state.selectedVenue) {
        this.setState({filter: '', selectedVenue: null});
      }
      //When leaving the users page, the user should be logged out
      else {
        this.props.logout('/users/logout', '/login');
        //this.props.history.push('/home');
      }
  }

  filterUpdate(event) {
      this.setState({filter: event.target.value});
  }

  selectVenue = (id) => {
      this.setState({filter: '', selectedVenue: this.state.venues.find((venue) => venue._id === id)});
      this.updateVendors(id);
  }

  selectVendor = (id) => {
    this.setState({filter: '', selectedVendor: this.state.vendors.find((vendor) => vendor._id === id)});
    this.updateGoods(this.state.selectedVenue._id, id);
  }

  selectGood = (id) => {
    this.setState({selectedGood: this.state.goods.find((good) => good._id === id), showingGood: true })
    console.log("checkout"+this.state.checkout)
  }

  updateVenues = () => axios.get('/admin/venues').then(res => this.setState({ venues: res.data.venues }));
  updateVendors = (selectedVenueID) => axios.get('/admin/vendors', {params: {selectedVenueID: selectedVenueID}}).then(res => this.setState({vendors: res.data.vendors }));
  updateGoods = (selectedVenueID, selectedVendorID) => axios.get('/admin/goods', {params: {selectedVenueID: selectedVenueID, selectedVendorID: selectedVendorID}}).then(res => this.setState({goods: res.data.goods}));
  updateOrders = () => axios.get('/users/orders', {params: {userID: this.props.user.id}}).then(res => this.setState({orders: res.data.orders}));

  addGood = (quantity) => {
    const name = this.state.selectedGood.name;
    const price = Number(this.state.selectedGood.price);
    const good = {
      name,
      price,
      quantity
    }
    let cart = this.state.cart;
    cart.push(good);
    this.setState({filter: '', cart: cart, showingGood: false});
  }
  something(){
    this.setState((prevState) =>({checkout:true}))
    console.log("checkout"+this.state.checkout)

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
        this.setState({cart: []});
        this.updateOrders();
          this.something();
      } else console.log("Something went wrong");
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
            {this.state.checkout ?
              <Checkout
                selectedVendor={this.state.selectedVendor}
                cart={this.state.cart}
                orders={this.state.orders}
                    />
                  :

          <Goods
            selectedVendor={this.state.selectedVendor}
            selectGood={this.selectGood.bind(this)}
            filter={this.state.filter}
          />
          };
        </div>
      );
    } else if (this.state.selectedVenue) {
      page = (
        <div>
          <h1>{this.state.selectedVenue.name}</h1>
          <Vendors
            vendors={this.state.vendors}
            selectVendor={this.selectVendor.bind(this)}
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
            filter={this.state.filter}
            adminPriv={adminPriv}
            openModal={this.toggleAddVenueModal.bind(this)}/>
        </div>
      );
    }

    return (
      <div className="">
        <AddVenueModal show={this.state.addingVenue} addVenue={this.updateVenues.bind(this)} modalClose={this.toggleAddVenueModal.bind(this)}/>
        <AddVendorModal show={this.state.addingVendor} selectedVenue={this.state.selectedVenue} addVendor={this.updateVendors.bind(this)} modalClose={this.toggleAddVendorModal.bind(this)}/>
        <ShowGoodModal show={this.state.showingGood} good={this.state.selectedGood} addGood={this.addGood.bind(this)} modalClose={this.toggleShowGoodModal.bind(this)} />
        <ShowCartModal show={this.state.showingCart}  cart={this.state.cart} submitCart={this.submitCart.bind(this)} modalClose={this.toggleShowCartModal.bind(this)} />
        <ClearCartModal show={this.state.clearingCart} clearCart={this.clearCart.bind(this)} modalClose={this.toggleClearCartModal.bind(this)} />
        <ShowOrdersModal show={this.state.showingOrders} orders={this.state.orders} modalClose={this.toggleShowOrdersModal.bind(this)} />
        <header className="app-header">
          <center>
          <h3>Welcome, {username}</h3>
          <Return returnPage={this.returnPage.bind(this)}/>
          <ShowCart show={this.state.selectedVendor} toggleCart={this.toggleShowCartModal.bind(this)}/>
          <button onClick={this.toggleShowOrdersModal.bind(this)}>My Orders</button>
          <Search filterValue={this.state.filter} filterUpdate={this.filterUpdate.bind(this)}/>
          </center>

        </header>
        {page}
      </div>
    );
  }
}

export default withRouter(User);
