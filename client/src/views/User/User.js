import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import data from '../../data/data'
import Venues from '../../components/User/Venues'
import Vendors from '../../../src/components/User/Vendors'
import Goods from '../../components/User/Goods'
import Return from '../../components/User/Return'
import ShowCart from '../../components/User/ShowCart'
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
          goods: []
        };
    }

    returnPage() {
        //If changing vendors, the user should be asked to confirm, as this should clear the user's cart
        if (this.state.selectedVendor) this.setState({filter: '', selectedVendor: null});
        else if (this.state.selectedVenue) this.setState({filter: '', selectedVenue: null});
        else this.props.history.push('/home');
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
        let selectedId = event.currentTarget.getAttribute('id')
        let selectedVenue = data.find((venue) => venue.id == selectedId);
        this.setState({filter: '', selectedVenue: selectedVenue});
        //this.props.history.push(this.props.history.location.pathname+'/'+selectedVenue.name.toLowerCase().replace(/[_\W]+/g, ""));
    }
    selectVendor(event) {
        let selectedId = event.currentTarget.getAttribute('id');
        let selectedVendor = this.state.selectedVenue.vendors.find((vendor) => vendor.id == selectedId);
        this.setState({filter: '', selectedVendor: selectedVendor});
        //this.props.history.push(this.props.history.location.pathname+'/'+selectedVendor.name.toLowerCase().replace(/[_\W]+/g, ""));
    }
    selectGood(event) {
        let selectedId = event.currentTarget.getAttribute('id');
        let selectedGood = this.state.selectedVendor.goods.find((good) => good.id == selectedId);
        this.state.goods.push(selectedGood)
        console.log("Added",   this.state.goods[this.state.goods.length - 1].name, "to order.");
    }

    render() {
        //if (!this.props.username) return <Redirect to="/login"/>

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
          />
        }

        return (
          <div className="">
            <header className="app-header">
              <h3>Welcome, {this.props.username}</h3>
              <p>You do {this.props.adminPriv ? '' : 'not '}have admin privileges</p>
              <Return returnPage={this.returnPage.bind(this)}/>
              <ShowCart showCart={this.showCart.bind(this)}/>
              <Search filterValue={this.state.filter} filterUpdate={this.filterUpdate.bind(this)}/>
              <h1>{this.state.selectedVendor ? this.state.selectedVendor.name : this.state.selectedVenue ? this.state.selectedVenue.name : 'Venues'}</h1>
            </header>
            {page}
          </div>
        );
      }
}

export default withRouter(User);
