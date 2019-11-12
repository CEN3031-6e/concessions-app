import React from 'react'
import axios from 'axios'

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            registerErrors: [],
            isLoading: false
        };
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        this.setState({isLoading: true});
        e.preventDefault();

        const { name, email, password, password2 } = this.state;

        const user = {
            name,
            email,
            password,
            password2
        };

        console.log(user);

        axios.post('/users/register', user).then(res => {
            if (res.data.success) {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    password2: '',
                    registerErrors: [],
                    isLoading: false
                });

                console.log(`Finished! ${JSON.stringify(res.data)}`);
            } else {
                this.setState({
                    password: '',
                    password2: '',
                    registerErrors: res.data.message,
                    isLoading: false
                });

                console.log(JSON.stringify(this.state.registerErrors));
            }
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        }
        return (
            <div>
                <h3>User Registration</h3>
                {this.state.registerErrors ? this.state.registerErrors.length > 0
                    ? this.state.registerErrors.map((errMsg, index) => (
                            <p className="register-error-message" key={index}>
                                {errMsg.msg}
                            </p>
                        ))
                    : null : null}
                <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" name="name" required className="form-control" value={this.state.name} onChange={e => this.onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" name="email" required className="form-control" value={this.state.email} onChange={e => this.onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" name="password" required className="form-control" value={this.state.password} onChange={e => this.onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="password" name="password2" required className="form-control" value={this.state.password2} onChange={e => this.onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register Now!" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;