import React from 'react'
import data from '../../data/data'
import Venues from '../../components/User/Venues'
import Vendors from '../../../src/components/User/Vendors'
import Goods from '../../components/User/Goods'
import Return from '../../components/User/Return'
import ShowCart from '../../components/User/ShowCart'
import Search from '../../components/User/Search'
import { Link } from 'react-router-dom'
import './User.css'

class User extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userID: null,
          filter: '',
          selectedVenue: null,
          selectedVendor: null,
          order: null
        };
    }

    returnPage() {
        if (this.state.selectedVendor) this.setState({filter: '', selectedVendor: null});
        else if (this.state.selectedVenue) this.setState({filter: '', selectedVenue: null});
        else this.props.history.push('/home');
    }
    showCart() {
        if (/*user.loggedIn()*/ true) {
          this.props.history.push('/user/cart');
        } else {
          this.props.history.push('/user/login');
        }
    }
    filterUpdate(event) {
        this.setState({filter: event.target.value});
    }
    
    selectVenue(event) {
        let selectedId = event.currentTarget.getAttribute('id')
        let selectedVenue = data.find((venue) => venue.id == selectedId);
        this.setState({filter: '', selectedVenue: selectedVenue});
        this.props.history.push(this.props.history.location.pathname+'/'+selectedVenue.name.toLowerCase().replace(/[_\W]+/g, ""));
    }
    selectVendor(event) {
        let selectedId = event.currentTarget.getAttribute('id');
        let selectedVendor = this.state.selectedVenue.vendors.find((vendor) => vendor.id == selectedId);
        this.setState({filter: '', selectedVendor: selectedVendor});
        this.props.history.push(this.props.history.location.pathname+'/'+selectedVendor.name.toLowerCase().replace(/[_\W]+/g, ""));
    }
    selectGood(event) {
        let selectedId = event.currentTarget.getAttribute('id');
        let selectedGood = this.state.selectedVendor.goods.find((good) => good.id == selectedId);
        console.log("Adding", selectedGood.name, "to order.");
    }

    render() {
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
              <Return returnPage={this.returnPage.bind(this)}/>
              <ShowCart showCart={this.showCart.bind(this)}/>
              <Link className='reg-link' to='/users/register'>Register</Link>
              <Search filterValue={this.state.filter} filterUpdate={this.filterUpdate.bind(this)}/>
              
            </header>
            {page}
          </div>
        );
      }
}

export default User;