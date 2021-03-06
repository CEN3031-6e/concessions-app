import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import axios from 'axios'
import './AddVenueModal.css'

class AddVenueModal extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            errorMsg: this.props.errorMsg
        }
    }

    modalClose = () => {
        this.setState({name: '', address: '', errorMsg: null});
        this.props.modalClose();
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();

        const { name, address } = this.state;
        const venue = {
            name,
            address
        };

        axios.post('/admin/addVenue', venue).then(res => {
            if (res.data.success) {
                this.setState({
                    name: '',
                    address: '',
                    errorMsg: ''
                });
                this.modalClose();
                this.props.addVenue();
            } else {
                this.setState({
                    errorMsg: res.data.message
                });
            }
        })
    }

    //Render the inputs to add a venue
    render() {
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.modalClose.bind(this)}/>
                <div 
                    className='AddVenueModal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <p className="error-text">{this.state.errorMsg}</p>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <input className="add-venue-input" type="text" name="name" placeholder="Name" value={this.state.name} onChange={e => this.onChange(e)}/>
                        <input className="add-venue-input" type="text" name="address" placeholder="Address" value={this.state.address} onChange={e => this.onChange(e)}/>
                        <input className="add-venue-input" type="submit" value="Add Venue"/>
                </form>
                </div>
            </div>
        );
    }
}

export default AddVenueModal;