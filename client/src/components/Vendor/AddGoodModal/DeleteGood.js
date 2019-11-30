import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import axios from 'axios'

class DeleteGood(props) extends React.Component {

 constructor(props) {
       super(props);
 }

 delete = () => {


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
                    <center>
	                    <p><h3>Add New Good</h3></p>
	                    {this.state.registerErrors ? this.state.registerErrors.length > 0
	                        ? this.state.registerErrors.map((errMsg, index) => (
	                                <p className="register-error-message" key={index}>
	                                    {errMsg}
	                                </p>
	                            ))
	                        : null : null}
	                    
						<button onClick={delete}>
							Delete good
						</button>	
                    </center>
                </div>


			</div>
		);
	}

}