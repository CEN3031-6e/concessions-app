import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class LoadingPaypal extends React.Component {

	constructor(props) {
      super(props);
      this.state = {
        p1: <p> Loading payment... </p>
      }
  }

  	componentDidMount() {
  		let search = window.location.search;
		let params = new URLSearchParams(search);
		let payment = params.get('paymentId');
		let payer = params.get('PayerID');

		let request = {
			paymentId: payment,
			payerID: payer
		}


		console.log("Executing payment.");
		axios.post('/users/executepayment', request).then(res => {
			console.log(res);
			if (res.data.success) this.setState({p1: <p> Payment successful. Order has been processed. </p>} );
			else this.setState({p1: <p> There was a failure while processing payment. </p>} );	 		
		});
  	}


	render() {
	 	return (
			<div>
				{this.state.p1}
			</div>
	 	);
	} 
}

export default LoadingPaypal;