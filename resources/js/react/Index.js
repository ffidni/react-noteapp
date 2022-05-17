import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './src/styles/index.css';
import App from './src/components/App';

window.ROOT  = document.getElementById('app');
window.USERSAPI = "https://localhost/note/api/users";
window.NOTESAPI = "https://localhost/note/api/notes";
window.authMode = window.ROOT.dataset.auth;
window.userID = window.ROOT.dataset.userid;
window.selectedNote = window.ROOT.dataset.selected;


export default class Index extends Component {
    constructor(props) {
        super(props);
    }

	render() {

		return (
			<React.Fragment>
				<App key={window.authMode}/>
			</React.Fragment>
		);
	}
}

if (window.ROOT) {
	ReactDOM.render(<Index/>, window.ROOT);
}
