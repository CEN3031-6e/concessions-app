import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import axios from 'axios'
//import './AddVendorModal.css'

class AddVendorModal extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            registerErrors: this.props.errorMsg
        }
    }

    modalClose = () => {
        this.setState({name: '', errorMsg: null});
        this.props.modalClose();
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, password, password2 } = this.state;
        const venueID = this.props.selectedVenue ? this.props.selectedVenue._id : '-1';
        const vendor = {
            name,
            email,
            password,
            password2,
            venueID
        };

        console.log(vendor);

        axios.post('/admin/addVendor', vendor).then(res => {
            if (res.data.success) {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    password2: '',
                    registerErrors: [],
                });
                this.modalClose();
                this.props.addVendor(venueID);
            } else {
                this.setState({
                    password: '',
                    password2: '',
                    errorMsg: res.data.message
                });
            }
        })
    }

    render() {
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.modalClose.bind(this)}/>
                <div 
                    className='Modal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <p className="error-text">{this.state.errorMsg}</p>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <input className="add-venue-input" type="text" name="name" placeholder="Name" value={this.state.name} onChange={e => this.onChange(e)}/>
                        <input className="add-venue-input" type="email" name="email" placeholder="Email" value={this.state.email} onChange={e => this.onChange(e)}/>
                        <input className="add-venue-input" type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={e => this.onChange(e)}/>
                        <input className="add-venue-input" type="password" name="password2" placeholder="Reenter Password" value={this.state.password2} onChange={e => this.onChange(e)}/>
                        <input className="add-venue-input" type="submit" value="Add Vendor"/>
                </form>
                </div>
            </div>
        );
    }
}

export default AddVendorModal;