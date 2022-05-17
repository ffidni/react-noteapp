import React, { Component } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from 'react-router-dom';



class AuthSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: props.type,
        };

        this.validateInput = this.validateInput.bind(this);
        this.register = this.register.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }


    async validateInput(inputs, validators, isRegister = false){
        var result = isRegister ? {email: "", password: "", confirm: ""} : {email: "", password: ""};
        var email;
        var password;
        if (isRegister) {
           var confirmStatus; 
        }

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].current.value === "") {
                result[inputs[i].current.dataset.name] = "This field can't be empty.";
            } else {
                if (inputs[i].current.dataset.name === "email") {
                    if (!isRegister) email = inputs[i].current.value;
                    else {
                        var emailValid = this.validateEmail(inputs[i].current.value);
                        result['email'] = emailValid ? "" : "Email is not valid";
                    }
                } else if (inputs[i].current.dataset.name === "password" ) {
                    password = inputs[i].current.value;
                    if (email) {
                        if (!isRegister) {
                            await validators.validateEmail(email)
                            .then(async (status) => {
                                console.log(status);
                                if (status === "alert") {
                                    result["alert"] = true
                                }
                                else if (!status) {
                                    result["email"] = "Account is not registered";
                                } else if (status !== "alert"){
                                    await validators.login(email, password).then((status) => {
                                        if (status === "alert") {
                                            result["alert"] = true;
                                        }
                                        else if (!status) {
                                            result["password"] = "Password is incorrect";
                                        }
                                    });
                                }
                            })

                        }
                        else {
                            var emailValid = this.validateEmail(email);
                            if (!emailValid) {
                                result['email'] = "Email is not valid"; 
                            }
                            result['password'] = validators.validatePassword(inputs[i].current.value);
                        }
                    } else if (isRegister) {
                        result['password'] = validators.validatePassword(inputs[i].current.value);
                    }

                } 
                if (isRegister && inputs[i].current.dataset.name === "confirm") {
                    confirmStatus = validators.validateConfirm(inputs[i].current.value, password);
                    if (!confirmStatus) result["confirm"] = "Password confirmation is not the same.";
                }
            }
        }

        return result;
    }

    async register(email, password){
        var data = {id: uuidv4(), email, password};
        const result = await fetch(window.USERSAPI, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then((response) => response.json())
          .then((result) => result)
          .catch((err) => err);


            if (result.hasOwnProperty("status")) {
                if (result["status"] === "success") {
                    this.props.setAlert({type: "success", text: "Your account has been successfuly registered."});
                    this.props.navigation('/note/login');
                } else {
                    return result["status"];
                }
        } else {
            this.props.setAlert({type: "failed", text: result.toString()}, false);
            return "alert";
        }
    }


    validateEmail(email){
        return email
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.type !== this.props.type) {
            this.setState({login: this.props.type});
        }
    }

  render() {
    return (
        <>
        { this.state.login ? 
        <Login validate={this.validateInput} login={this.login} getStatus={this.getStatus} setAlert={this.props.setAlert}/>
      : 
        <Register validate={this.validateInput} register={this.register} getStatus={this.getStatus} setAlert={this.props.setAlert}/>
        }
        </>  
    )
  }
}


export default function(props) {
    const navigation = useNavigate();

    return <AuthSection {...props} navigation={navigation}/>
}