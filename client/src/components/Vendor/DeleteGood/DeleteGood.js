import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import axios from 'axios'
import './DeleteGood.css'

class DeleteGood extends React.Component {



 constructor(props) {
       super(props);
 }

 delete = () => {

     console.log(this.props.good._id);

     let goodID = this.props.good._id;
     let venueID = this.props.venueID;
     let linkedID = this.props.linkedID;


     let goodToDelete = {
            goodID,
            venueID,
            linkedID    
    };

    axios.post('/vendors/deleteGood', goodToDelete).then(res => {
           console.log("item deleted");
            this.props.close();
            this.props.deleteGood();

     });
    
 }

    render() {

        let goodName;
        if (this.props.good == null) {
            goodName = "";
        }
        else {
             goodName = this.props.good.name;
        }

        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.close}/>
                <div 
                    className='DeleteGood'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <center>
                        <p><h3>Are you sure that you want to delete {goodName}?</h3></p>
                        <button onClick={this.delete.bind(this)}>
                            Delete good
                        </button>   
                        <button onClick= {this.props.close}>
                            Return
                        </button>
                    </center>
                </div>


            </div>
        );
    }

}

export default DeleteGood;