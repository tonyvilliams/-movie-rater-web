import React, { Component } from 'react';
// import { render } from 'react-dom';
import { withCookies } from 'react-cookie';

class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLoginView: true
    }

    inputChanged = event => { 
        let cred = this.state.credentials
        cred[event.target.name] = event.target.value
        this.setState({credentials: cred})
    }

    login = event => {
        if(this.state.isLoginView) {
            console.log(this.state.credentials);
            fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, // headers
            body: JSON.stringify(this.state.credentials)
            }).then ( resp =>  resp.json())
            .then ( res => {
                // console.log(res.token);
                this.props.cookies.set('mytoken', res.token);
                window.location.href = "/movies"
            }) // res
            .catch( error => console.log(error))
        } else {
            console.log(this.state.credentials);
            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, // headers
            body: JSON.stringify(this.state.credentials)
            }).then ( resp =>  resp.json())
            .then ( res => {
                // console.log(res.token);
                this.setState({isLoginView: true})
            }) // res
            .catch( error => console.log(error))
        }
    }        

    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView});
    }

render(){
        return <div className="login-container"> 
            <h1>
                {this.state.isLoginView ? 'Login' : 'Register' }
            </h1>
            <span>Username</span>
            <input type="text" name="username" value={this.state.credentials.username} onChange={this.inputChanged}/><br/>
            &nbsp;
            <span>Password</span>
            <input type="text" name="password" value={this.state.credentials.password} onChange={this.inputChanged}/><br/>
            &nbsp;
            <button onClick={this.login}>
                {this.state.isLoginView ? 'Login' : 'Register' }
            </button>
            <p onClick={this.toggleView}>
                {this.state.isLoginView ? 'Create Account' : 'Back to Login' }
            </p>
        </div>

    }
}


export default withCookies(Login);