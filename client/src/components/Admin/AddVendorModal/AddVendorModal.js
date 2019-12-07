import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import axios from 'axios'
import './AddVendorModal.css'

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
            registerErrors: []
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
        const addVendor = {
            name,
            email,
            password,
            password2,
            venueID
        };

        axios.post('/admin/addVendor', addVendor).then(res => {
            if (res.data.success) {
                let linkedID = res.data.linkedID;
                let regVendor = {
                    name,
                    email,
                    password,
                    venueID,
                    linkedID
                };
                axios.post('/admin/regVendor', regVendor).then(res => res.data.success ? console.log(":)") : console.log(':('));
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
                    registerErrors: res.data.message
                });
            }
        })
    }

    //Render the inputs to register a vendor
    render() {
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.modalClose.bind(this)}/>
                <div 
                    className='AddVendorModal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <center>
                    <h3>User Registration</h3>
                    {this.state.registerErrors ? this.state.registerErrors.length > 0
                        ? this.state.registerErrors.map((errMsg, index) => (
                                <p className="register-error-message" key={index}>
                                    {errMsg.msg}
                                </p>
                            ))
                        : null : null}
                    <form onSubmit={e => this.onSubmit(e)}>
                        <input className="add-vendor-input" type="text" name="name" placeholder="Name" value={this.state.name} onChange={e => this.onChange(e)}/>
                        <input className="add-vendor-input" type="email" name="email" placeholder="Email" value={this.state.email} onChange={e => this.onChange(e)}/>
                        <input className="add-vendor-input" type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={e => this.onChange(e)}/>
                        <input className="add-vendor-input" type="password" name="password2" placeholder="Reenter Password" value={this.state.password2} onChange={e => this.onChange(e)}/>
                        <input className="add-vendor-input" type="submit" value="Add Vendor"/>
                    </form>
                    </center>
                </div>
            </div>
        );
    }
}

export default AddVendorModal;