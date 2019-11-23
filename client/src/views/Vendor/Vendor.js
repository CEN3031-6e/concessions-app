import React from 'react'
import axios from 'axios'
import AddGoodModal from '../../components/Vendor/AddGoodModal/AddGoodModal'
import Return from '../../components/Vendor/Return'
import './Vendor.css'

class Vendor extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            filter: '',
            goods: [],
            addingGood: false
        };
    }

    returnPage = () => this.props.history.push('/home');
    toggleAddGoodModal = () => this.setState({addingGood: !this.state.addingGood}); 
    updateGoods = () => axios.get('/vendors/goods', {params: {venueID: this.props.vendor.venueID, linkedID: this.props.vendor.linkedID}}).then(res => this.setState({ goods: res.data.goods }));
    componentDidMount = () => this.updateGoods();

    render() {
        let goods = this.state.goods
        .map((good) => <p>{good.name}</p>);
        let addGood = <button onClick={this.toggleAddGoodModal.bind(this)}>Add Good</button>

        return (
            <div>
                <header className="app-header">
                  <Return returnPage={this.returnPage.bind(this)}/>
                </header>
                <h1>{this.props.vendor.name}</h1>
                <AddGoodModal show={this.state.addingGood} vendor={this.props.vendor} addGood={this.updateGoods.bind(this)} modalClose={this.toggleAddGoodModal.bind(this)}/>
                {goods}
                {addGood}
            </div>
        );
    }
}

export default Vendor;
