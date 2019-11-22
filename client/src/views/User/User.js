import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import data from '../../data/data'
import Venues from '../../components/User/Venues'
import Vendors from '../../../src/components/User/Vendors'
import Goods from '../../components/User/Goods'
import Return from '../../components/User/Return'
import ShowCart from '../../components/User/ShowCart'
import Cart from '../../components/User/Cart'
import Search from '../../components/User/Search'
import './User.css'

class User extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        filter: '',
        selectedVenue: null,
        selectedVendor: null,
        order: null,
        goods: [],
        addingVenue: false,
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
    let subtotal = 0;
    for (const good of this.state.goods) {
      let str = good.name + ': $' + good.price;
      subtotal = subtotal + good.price;
      console.log(str);
    }
    console.log("Subtotal: $" + subtotal.toFixed(2));

  }
  filterUpdate(event) {
      this.setState({filter: event.target.value});
  }

  selectVenue(event) {
      this.setState({
        filter: '',
        selectedVenue: data.find((venue) => {
          return String(venue.id) === event.currentTarget.getAttribute('id');
        })
      });
      //this.props.history.push(this.props.history.location.pathname+'/'+selectedVenue.name.toLowerCase().replace(/[_\W]+/g, ""));
  }
  selectVendor(event) {
      this.setState({
        filter: '',
        selectedVendor: this.state.selectedVenue.vendors.find((vendor) => {
          return String(vendor.id) === event.currentTarget.getAttribute('id')
        })
      })
      //this.props.history.push(this.props.history.location.pathname+'/'+selectedVendor.name.toLowerCase().replace(/[_\W]+/g, ""));
  }
  selectGood(event) {
      let goods = this.state.goods;
      goods.push(this.state.selectedVendor.goods.find((good) => {
        return String(good.id) === event.currentTarget.getAttribute('id')
      }));
      this.setState({
        filter: '',
        goods: goods
      })
  }
  addVenue() {
    this.setState({addingVenue: true});
  }

  render() {
    if (!this.props.loggedIn) return <Redirect to="/login"/>
    let adminPriv = (this.props.loggedIn && (this.props.user.email === 'cen3031@ufl.edu'));
    let username = this.props.loggedIn ? this.props.user.name : 'error';

    let page = <p>Uh-oh! Looks like we got lost some where. Try refreshing the page :)</p>;
    if (this.state.selectedVendor) {
      page = <Goods
        selectedVendor={this.state.selectedVendor}
        selectGood={this.selectGood.bind(this)}
        filter={this.state.filter}
      />
    } else if (this.state.selectedVenue) {
      page = <Vendors
        selectedVenue={this.state.selectedVenue}
        selectVendor={this.selectVendor.bind(this)}
        filter={this.state.filter}
      />
    } else {
      page = <Venues
        venues={data}
        selectVenue={this.selectVenue.bind(this)}
        filter={this.state.filter}
        addVenue={adminPriv ? this.addVenue.bind(this) : null}
      />
    }

    return (
      <div className="">
        <header className="app-header">
          <h3>Welcome, {username}</h3>
          <p>You do {adminPriv ? '' : 'not '}have admin privileges</p>
          <Return returnPage={this.returnPage.bind(this)}/>
          <ShowCart showCart={this.showCart.bind(this)}
                      showOnOff ={this.showOnOff.bind(this)}/>
          {this.state.showedCart ?
            <Cart hideCart={this.showOnOff.bind(this)}
                  />
                :null
          }

          <Search filterValue={this.state.filter} filterUpdate={this.filterUpdate.bind(this)}/>
          <h1>{this.state.selectedVendor ? this.state.selectedVendor.name : this.state.selectedVenue ? this.state.selectedVenue.name : 'Venues'}</h1>
        </header>
        {page}
      </div>
    );
  }
}

export default withRouter(User);
