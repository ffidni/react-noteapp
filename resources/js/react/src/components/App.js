import NoteSection from '../sections/NoteSection';
import AuthSection from '../sections/AuthSection';
import React, {Component} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import InformationAlert from '../components/InformationAlert';



export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authMode: window.authMode,
            showAlert: false,
        };

        this.setAlert = this.setAlert.bind(this);
        this.clearAlert = this.clearAlert.bind(this);

    }

    setAlert({type, text}, delay = true){
        this.setState({showAlert: {type, text, delay: delay}})
    }

    clearAlert(){
        this.setState({showAlert: false});
    }

    render () {
        console.log(window.authMode);
        return (
            <BrowserRouter>
                {this.state.authMode === "true" ?
                    <Routes>
                        <Route path="/note/" element={<AuthSection type={false} setAlert={this.setAlert}/>}/>
                        <Route exact path="/note/login" element={<AuthSection type={true} setAlert={this.setAlert}/>}/>
                        <Route path="/note/register" element={<AuthSection type={false} setAlert={this.setAlert}/>}/>
                    </Routes> 
                : 
                    <Routes>
                        <Route path="/note/" element={<NoteSection setAlert={this.setAlert}/>}/>
                    </Routes>
                }
        {
            this.state.showAlert && 
            <InformationAlert type={this.state.showAlert.type} text={this.state.showAlert.text} delay={this.state.showAlert.delay} clearAlert={this.clearAlert}/>
        }

            </BrowserRouter>
        )
    }
}
