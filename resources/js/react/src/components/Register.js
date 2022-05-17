import React, { Component, createRef } from 'react'
import request from '../../../helper/request';
import {Link} from 'react-router-dom';




export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {email: "", password: "", confirm: "", alert: ""},
        }

        this.emailRef = createRef();
        this.passwordRef = createRef();
        this.passwordConfirmRef = createRef();
        this.validatePassword = this.validatePassword.bind(this);
        this.validateConfirm = this.validateConfirm.bind(this);
        this.validateAll = this.validateAll.bind(this);
    }



    validatePassword(pass){
        const validation = pass.match(/(?=.*[A-Z])(?=.*[0-9].*[0-9]).{8}/);

        if (!validation) return "Password must have atleast 1 uppercase letter, 2 numbers, & 8 characters";
        return "";
    }

    validateConfirm(pass, confirmPass) {
        return pass === confirmPass
    }

    async validateAll(){
        var errors = await this.props.validate(
            [this.emailRef, this.passwordRef, this.passwordConfirmRef], 
            {validatePassword: this.validatePassword, validateConfirm: this.validateConfirm},
            true
        );

        this.setState({
            errors,
        });

        if (!errors.email && !errors.password && !errors.confirm) {
            const result = await this.props.register(this.emailRef.current.value, this.passwordRef.current.value);
            if (result) {
                this.setState((prevState) => {
                    let errors = {...prevState.errors};
                    if (result === "alert") {
                        errors["alert"] = true;
                    } else {
                        errors["email"] = "Account is already exists.";
                    }
                    return {errors}
                });
            }
        }
    }


  render() {

    return (
      <div className="auth">
          <div className="title">
              <h3>Register</h3>
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
              <div className="row">
                  <p>Confirm Password</p>
                  <input ref={this.passwordConfirmRef} data-name="confirm" type="password" />
                  <p className="error">{this.state.errors.confirm}</p>
              </div>
          </div>
          <a className="btn" onClick={this.validateAll}>Create Account</a>
          <p className="already">Already have an account? <Link to="/note/login">Login</Link></p>
        
      </div>

    )
  }
}
