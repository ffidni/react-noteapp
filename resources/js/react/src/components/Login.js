import React, { Component, createRef } from 'react'
import {Link} from 'react-router-dom';



export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {email: "", password: "", alert: ""}
        }

        this.emailRef = createRef();
        this.passwordRef = createRef();
        this.login = this.login.bind(this);
        this.validateAll = this.validateAll.bind(this);
        this.validateEmail = this.validateEmail.bind(this);

    }


    async login (email, password) {
        const result = await fetch(
            window.USERSAPI + '?' + new URLSearchParams({email, password}),
            {
                'Method': "GET",
                'Cache-Control': 'no-cache',
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => err);

        console.log(result, "WOKWOWK");

        if (result.hasOwnProperty("id")) {
            return true;
        } else if (result.hasOwnProperty("status")) {
            return false;
        }
        this.props.setAlert({type: "failed", text: result.toString()}, false);
        return "alert";


    }

    async validateEmail (email) {
        const result = await fetch(window.USERSAPI + '?' + new URLSearchParams({email}),
        {
            "Method": "GET",
            "Cache-Control": "no-cache",
        }
        )
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => err);

        console.log(result, "AA");


        if (result.hasOwnProperty("id")) {
            return true;
        }
        else if (result.hasOwnProperty("status")) {
            return false;
        }
        this.props.setAlert({type: "failed", text: result.toString()}, false);
        return "alert";

    }

    async validateAll(){
        var errors = await this.props.validate(
            [this.emailRef, this.passwordRef],
            {login: this.login, validateEmail: this.validateEmail}
        );
        this.setState({
            errors,
        });

        if (!errors.email && !errors.password && !errors.alert) {
            location.replace("/note");
        }
    }

  render() {
    return (
        <div className="auth">
        <div className="title">
            <h3>Login</h3>
        </div>
        <div className="content">
            <div className="row">
                <p>Email</p>
                <input ref={this.emailRef} data-name="email" type="text" />
                <p className="error">{this.state.errors.email}</p>
            </div>
            <div className="row">
                <p>Password</p>
                <input ref={this.passwordRef} data-name="password" type="password" />
                <p className="error">{this.state.errors.password}</p>
            </div>
        </div>
        <a className="btn" onClick={this.validateAll}>Access Your Notes</a>
          <p className="already">Don't have an account? <Link to="/note/register">Register</Link></p>
    </div>
    )
  }
}
