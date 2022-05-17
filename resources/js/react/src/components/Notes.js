import React, {Component} from 'react';
import {v4 as uuidv4} from 'uuid';


export default class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            selected: props.selectedNote,
            show_trash: ["none", ""],
        }
    }

    componentDidMount () {
        this.setState({
            notes: this.props.notes
        });

    }


    render () {
        return (
            <div className="notes">
                <h3 className="notes-title">All Notes</h3>
                <ul className="notes-list">
                    {
                    this.props.notes.map((note) =>
                        (
                        <li key={note.id}>
                            <div onMouseEnter={() => this.setState({show_trash: ["block", note.id]})} onMouseLeave={() => this.setState({show_trash: ["none", note.id]})} className={note.id === this.state.selected ? "selected" : ""} onClick={() => {
                                this.props.selectNote(note);
                                this.setState({selected: note.id});
                                this.props.scrollToContent();
                                }}>
                                <a>{note.title}</a>
                                <p>
                                <span className="category-tag">{note.category}</span>
                                <span onClick={() => this.props.deleteNote(note.id)} style={this.state.show_trash[1] === note.id ? {display: this.state.show_trash[0]} : {display: "none"}} className="fa fa-trash"></span>
                                </p>
                            </div>
                        </li>
                        )
                    )
                    }
                </ul>
            </div>
        );
    }

}