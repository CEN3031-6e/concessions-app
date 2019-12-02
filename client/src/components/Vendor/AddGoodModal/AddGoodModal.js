import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import axios from 'axios'
import './AddGoodModal.css'

class AddGoodModal extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            price: '',
            quantity: '',
            registerErrors: []
        }
    }

    modalClose = () => {
        this.setState({name: '', price: '', quantity: '', registerErrors: []});
        this.props.modalClose();
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();

        const { name, price, quantity } = this.state;
        const { venueID, linkedID } = this.props.vendor;

        const good = {
            name,
            venueID,
            linkedID,
            price,
            quantity
        };

        axios.post('/vendors/addGood', good).then(res => {
            if (res.data.success) {
                this.setState({
                    name: '',
                    price: '',
                    quantity: '',
                    registerErrors: [],
                });
                this.modalClose();
                this.props.addGood();
            } else {
                let errs = this.state.registerErrors;
                errs.push(res.data.message);
                this.setState({
                    registerErrors: errs
                });
            }
        })
    }

    render() {
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.modalClose.bind(this)}/>
                <div 
                    className='AddGoodModal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <center>
                    <h3>Add New Good</h3>
                    {this.state.registerErrors ? this.state.registerErrors.length > 0
                        ? this.state.registerErrors.map((errMsg, index) => (
                                <p className="register-error-message" key={index}>
                                    {errMsg}
                                </p>
                            ))
                        : null : null}
                    <form onSubmit={e => this.onSubmit(e)}>
                        <input className="add-good-input" type="text" name="name" placeholder="Name" value={this.state.name} onChange={e => this.onChange(e)}/>
                        <input className="add-good-input" type="text" name="price" placeholder="Base Price" value={this.state.price} onChange={e => this.onChange(e)}/>
                        <input className="add-good-input" type="text" name="quantity" placeholder="Base Quantity" value={this.state.quantity} onChange={e => this.onChange(e)}/>
                        <input className="add-good-submit" type="submit" value="Add Good"/>
                    </form>
                    </center>
                </div>
            </div>
        );
    }
}

export default AddGoodModal;