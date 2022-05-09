import {Component} from 'react';
import {v4 as uuidv4} from 'uuid';


export default class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    componentDidMount () {
        this.setState({
            notes: this.props.notes
        });

    }

    select(id) {
        this.setState((prevState) => {
            var oldNotes = prevState.notes;
            oldNotes.map((note) => {
                note.selected = false;
            })
            oldNotes[oldNotes.indexOf(oldNotes.find((note) => note.id === id))].selected = true;
            return {notes: oldNotes};
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
                            <div className={note.selected ? "selected" : ""} onClick={() => {
                                this.props.selectNote(note);
                                this.select(note.id);
                                this.props.scrollToContent();
                                }}>
                                <a>{note.title}</a>
                                <span className="category-tag">{note.category}</span>
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