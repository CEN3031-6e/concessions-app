import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
//import data from '../../data/data'
import Venues from '../../components/User/Venues'
import Vendors from '../../../src/components/User/Vendors'
import Goods from '../../components/User/Goods'
import Return from '../../components/User/Return'
import ShowCart from '../../components/User/ShowCart'
import Cart from '../../components/User/Cart'
import Search from '../../components/User/Search'
import AddVenueModal from '../../components/Admin/AddVenueModal/AddVenueModal'
import AddVendorModal from '../../components/Admin/AddVendorModal/AddVendorModal'
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

        addingVenue: false,
        addingVendor: false,
        showedCart: false
      };
  }

  showOnOff(){
    this.setState({
      showedCart: !this.state.showedCart
    });
  }
  returnPage() {
      //When leaving a vendor, the user should be asked to confirm, as this should clear the user's cart
      if (this.state.selectedVendor) {
        this.setState({filter: '', selectedVendor: null, goods: []});
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
  showCart() {
    // let subtotal = 0;
    // for (const good of this.state.goods) {
    //   let str = good.name + ': $' + good.price;
    //   subtotal = subtotal + good.price;
    //   console.log(str);
    // }
    //console.log("Subtotal: $" + subtotal.toFixed(2));

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
    //this.updateGoods(id);
  }

  selectGood(event) {
      let cart = this.state.cart;
      console.log(cart);
      cart.push(this.state.selectedVendor.goods.find((good) => {
        return good._id === event.currentTarget.getAttribute('id')
      }));
      this.setState({
        filter: '',
        cart: cart
      })
  }

  updateVenues = () => axios.get('/admin/venues').then(res => this.setState({ venues: res.data.venues }));
  updateVendors = (selectedVenueID) => axios.get('/admin/vendors', {params: {selectedVenueID: selectedVenueID}}).then(res => this.setState({vendors: res.data.vendors })); 

  toggleAddVenueModal = () => this.setState({ addingVenue: !this.state.addingVenue });
  toggleAddVendorModal = () => this.setState({ addingVendor: !this.state.addingVendor });

  componentDidMount = () => {
    this.updateVenues();
    this.updateVendors();
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
        <header className="app-header">
          <center>
          <h3>Welcome, {username}</h3>
          <Return returnPage={this.returnPage.bind(this)}/>
          <ShowCart showCart={this.showCart.bind(this)}
                      showOnOff ={this.showOnOff.bind(this)}/>
          {this.state.showedCart ?
            <Cart hideCart={this.showOnOff.bind(this)}
                  cart={this.state.cart}
                  />
                :null
          }

          <Search filterValue={this.state.filter} filterUpdate={this.filterUpdate.bind(this)}/>
          </center>
          <h1>{this.state.selectedVendor ? this.state.selectedVendor.name : this.state.selectedVenue ? this.state.selectedVenue.name : ' Venues'}</h1>
        </header>
        {page}
      </div>
    );
  }
}

export default withRouter(User);
