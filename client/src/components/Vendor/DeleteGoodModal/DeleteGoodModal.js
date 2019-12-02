import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import './DeleteGoodModal.css'

class DeleteGoodModal extends React.Component {

 constructor(props) {
       super(props);

       this.state = {
           negMessage: ""
       };
 }

 deleteGood = () => {

     let goodID = this.props.good._id;
     let venueID = this.props.venueID;
     let linkedID = this.props.linkedID;


     let goodToDelete = {
            goodID,
            venueID,
            linkedID    
    };

    axios.post('/vendors/deleteGood', goodToDelete).then(res => {
        if (res.data.success) {
            this.setState({ negMessage: "" });
            this.props.setPosMessage(this.props.good.name + " successfully deleted.");
            this.props.modalClose();
            this.props.deleteGood();
        } else this.setState({ negMessage: "Unable to delete " + this.props.good.name });
     });
 }

    render() {
        let goodName = this.props.good ? this.props.good.name : "";

        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.close}/>
                <div 
                    className='DeleteGoodModal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <center>
                        <p className="register-error-message">{this.state.negMessage}</p>
                        <h3>Are you sure that you want to delete "{goodName}"?</h3>
                        <Button className="delete-good-modal-btn" onClick={this.deleteGood.bind(this)}>Delete</Button>   
                        <Button className="delete-good-modal-btn" onClick= {this.props.modalClose}>Cancel</Button>
                    </center>
                </div>
            </div>
        );
    }
}

export default DeleteGoodModal;