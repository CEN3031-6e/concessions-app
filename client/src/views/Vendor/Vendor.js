import React from 'react'
import data from '../../data/data'
import Goods from '../../components/User/Goods'
import Return from '../../components/Vendor/Return'
import './Vendor.css'

class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          filter: '',
          goods: []
        };
    }

    returnPage() {
      this.props.history.push('/home');
    }

    selectGood(event) {
        //this.state.goods.push(selectedGood)
        console.log("Added",   this.state.goods[this.state.goods.length - 1].name, "to order.");
    }

    render() {
        let page = <p>Uh-oh! Looks like we got lost some where. Try refreshing the page :)</p>;
        return (
          <div>
            <header className="app-header">
              <Return returnPage={this.returnPage.bind(this)}/>
            </header>
            {page}
          </div>
        );
      }
}

export default User;
