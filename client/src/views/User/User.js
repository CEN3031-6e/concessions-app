import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Venues from '../../components/User/Venues'
import Vendors from '../../../src/components/User/Vendors'
import Goods from '../../components/User/Goods'
import Search from '../../components/User/Search'
import AddVenueModal from '../../components/Admin/AddVenueModal/AddVenueModal'
import AddVendorModal from '../../components/Admin/AddVendorModal/AddVendorModal'
import ShowGoodModal from '../../components/User/ShowGoodModal/ShowGoodModal'
import Checkout from '../../components/User/Checkout'
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
        //These states determine what content to display to the user,
        //automatically updated by the database
        venues: [],
        selectedVenue: null,
        vendors: [],
        selectedVendor: null,
        goods: [],
        selectedGood: null,

        //These states manage what exists in the search filter,
        //the user's cart, and the user's order history
        filter: '',
        cart: [],
        orders: [],

        //These states determine which modal, if any,
        //the user should currently be viewing/engaging with
        addingVenue: false,
        addingVendor: false,
        showingCart: false,
        clearingCart: false,
        showingGood: false,
        showingOrders: false,

        //These states display a success or error message to the screen
        //whenever the user performs an action
        posMessage: "",
        negMessage: "",

        //These states manage whether or not the user is checking out
        //and store associated information
        checkout: false,
        card: false,
        submittedOrder: null,
      };
  }

  //This function manages the logic for where to take the user
  //upon pressing return based on their current screen
  returnPage = () => {
    if (this.state.checkout) this.setState({ checkout: false });
    else if (this.state.selectedVendor) this.setState({ clearingCart: true });
    else if (this.state.selectedVenue) this.setState({ filter: '', selectedVenue: null });
    else this.props.history.push('/home');
  }

  filterUpdate = (event) => this.setState({ filter: event.target.value });

  //Gets the selected venue and updates state
  selectVenue = (id) => {
    this.setState({ filter: '', selectedVenue: this.state.venues.find((venue) => venue._id === id) });
    this.updateVendors(id);
  }

  //Gets the selected vendor and updates state
  selectVendor = (id) => {
    this.setState({filter: '', selectedVendor: this.state.vendors.find((vendor) => vendor._id === id)});
    this.updateGoods(this.state.selectedVenue._id, id);
  }

  //Gets the selected good and updates state
  selectGood = (id) => {
    this.setState({selectedGood: this.state.goods.find((good) => good._id === id), showingGood: true })
  }

  //Deletes the selected venue (only accessible by admins)
  deleteVenue = (id) => {
    axios.post('/admin/deleteVenue', {id}).then(res => {
      if (res.data.success) {
        this.setState({ posMessage: "Successfully deleted vendor.", negMessage: "" });
        this.updateVenues();
      } else this.setState({ negMessage: "Failed to delete venue.", posMessage: "" });
    })
  }

  //Deletes the selected vendor (only accessible by admins)
  deleteVendor = (id) => {
    let venueID = this.state.selectedVenue._id;
    axios.post('/admin/deleteVendor', {venueID, id}).then(res => {
      if (res.data.success) {
        this.setState({ posMessage: "Successfully deleted vendor.", negMessage: "" });
        this.updateVendors(venueID);
      } else this.setState({ negMessage: "Failed to delete vendor.", posMessage: "" });
    })
  }

  //Functions to update the data in venues, vendors, goods, and orders based on the user's selections
  updateVenues = () => axios.get('/admin/venues').then(res => this.setState({ venues: res.data.venues }));
  updateVendors = (selectedVenueID) => axios.get('/admin/vendors', {params: {selectedVenueID: selectedVenueID}}).then(res => this.setState({vendors: res.data.vendors }));
  updateGoods = (selectedVenueID, selectedVendorID) => axios.get('/admin/goods', {params: {selectedVenueID: selectedVenueID, selectedVendorID: selectedVendorID}}).then(res => this.setState({goods: res.data.goods}));
  updateOrders = () => axios.get('/users/orders', {params: {userID: this.props.user.id}}).then(res => this.setState({orders: res.data.orders}));

  //Adds a selected good + quantity to the user's current cart
  addGood = (quantity) => {
    if (!this.state.selectedGood) this.setState({filter: '', showingGood: false, posMessage: "", negMessage: "Failed to add good to cart." });
    else {
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
      this.setState({filter: '', cart: cart, showingGood: false, posMessage: "Added " + quantity + " " + name + " to cart.", negMessage: "" });
    }
  }

  //Submits the user's cart to the database
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
        this.setState({ showingCart: false, submittedOrder: order, posMessage: "Success!", negMessage: "", checkout: true });
        this.updateOrders();
      }
      else this.setState({ showingCart: false, negMessage: "Failure!", posMessage: "" });
    })
  }

  //Functions to manage the cart based on user actions
  resetCart = () => this.setState({ cart: [], showingCart: false, checkout: false, posMessage: "Successfully cleared cart.", negMessage: "" });
  clearCart = () => this.setState({ filter: '', selectedVendor: null, goods: [], cart: [], clearingCart: false, posMessage: "Successfully cleared cart.", checkout: false});
  postCart = () => this.setState({ filter: '', selectedVendor: null, goods: [], cart: [], clearingCart: false, posMessage: "Successfully paid for order.", checkout: false});

  //Functions to toggle the display of every modal
  toggleAddVenueModal = () => this.setState({ addingVenue: !this.state.addingVenue });
  toggleAddVendorModal = () => this.setState({ addingVendor: !this.state.addingVendor });
  toggleShowGoodModal = () => this.setState({ showingGood: !this.state.showingGood });
  toggleShowCartModal = () => this.setState({ showingCart: !this.state.showingCart });
  toggleClearCartModal = () => this.setState({ clearingCart: !this.state.clearingCart });
  toggleShowOrdersModal = () => this.setState({ showingOrders: !this.state.showingOrders });

  //Updates the venues and orders upon the page loading
  componentDidMount = () => {
    this.updateVenues();
    this.updateOrders();
  }

  render() {
    //Ensures the user is logged in
    if (!this.props.loggedIn) return <Redirect to="/login"/>

    //Sets functionality to determine if the user is an admin
    let adminPriv = (this.props.loggedIn && (this.props.user.email === 'cen3031@ufl.edu'));
    let username = this.props.loggedIn ? this.props.user.name : 'error';

    //Renders the base data on the page based on what the user's selected
    let page = <p>Uh-oh! Looks like we got lost some where. Try refreshing the page :)</p>;
    //If checking out, render the Checkout element
    if (this.state.checkout) {
      page = (
        <div>
          <h1>Checking Out</h1>
          <Checkout
            submittedOrder={this.state.submittedOrder}
            selectedVendor={this.state.selectedVendor}
            cart={this.state.cart}
            orders={this.state.orders}
            card={this.state.card}
            postCart={this.postCart.bind(this)}
            clearCart={this.resetCart.bind(this)}
          />
        </div>
      )
    }
    //Else If a vendor is selected, display that vendor's goods
    else if (this.state.selectedVendor) {
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
    } 
    //Else If a venue is selected, display that venue's vendors
    else if (this.state.selectedVenue) {
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
    } 
    //Else display all available venues
    else {
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

    //In return, we render all of the modals (if they are currently meant to be shown),
    //some header information, any message that needs to be displayed to the user,
    //and the page information that was determined above
    return (
      <div className="">
        {this.state.addingVenue ? <AddVenueModal show={true} addVenue={this.updateVenues.bind(this)} modalClose={this.toggleAddVenueModal.bind(this)}/> : null}
        {this.state.addingVendor ? <AddVendorModal show={true} selectedVenue={this.state.selectedVenue} addVendor={this.updateVendors.bind(this)} modalClose={this.toggleAddVendorModal.bind(this)}/> : null}
        {this.state.showingGood ? <ShowGoodModal show={true} good={this.state.selectedGood} addGood={this.addGood.bind(this)} modalClose={this.toggleShowGoodModal.bind(this)} /> : null}
        {this.state.showingCart ? <ShowCartModal show={true} cart={this.state.cart} submitCart={this.submitCart.bind(this)} clearCart={this.resetCart.bind(this)} modalClose={this.toggleShowCartModal.bind(this)} /> : null}
        {this.state.clearingCart ? <ClearCartModal show={true} clearCart={this.clearCart.bind(this)} modalClose={this.toggleClearCartModal.bind(this)} /> : null}
        {this.state.showingOrders ? <ShowOrdersModal show={true} orders={this.state.orders} modalClose={this.toggleShowOrdersModal.bind(this)} /> : null}
        <header className="app-header">
          <center>
            <h3>Welcome, {username}</h3>
              <Button className="user-button" onClick={this.returnPage.bind(this)}>Return</Button>
              {this.state.selectedVendor ? <Button className="user-button" onClick={this.toggleShowCartModal.bind(this)}>My Cart</Button> : null}
              <Button className="user-button" onClick={this.toggleShowOrdersModal.bind(this)}>My Orders</Button>
              {!this.state.checkout ? <Search filterValue={this.state.filter} filterUpdate={this.filterUpdate.bind(this)}/>: null}
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
