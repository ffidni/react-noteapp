import React, {Component, createRef} from 'react';
import {Link} from 'react-router-dom'

export default class Note extends Component {

    constructor(props) {
        super(props)


        this.state = {
            changes: false,
        };
        this.titleRef = createRef();
        this.note = {...props.note};
        this.categoryRef = createRef();
        this.dateRef = createRef();
        this.contentRef = createRef();
        this.handleChanges = this.handleChanges.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    handleChanges(e, fit = false) {
        if (fit) e.target.style.width = e.target.value.length + 1.1 + 'ch';
        if (e.target.value !== e.target.defaultValue) {
            if (!this.state.changes) {
                this.setState({
                    changes: true,
                });
            }
        } else {
            this.setState({
                changes: false,
            });
        }

        this.note[e.target.dataset.name] = e.target.value;

    }

    componentDidMount () {
        this.titleRef.current.style.width = this.titleRef.current.value.length + 1+ 'ch';
    }


    saveChanges () {
        this.setDefaults();
        this.setState({
            changes: false,
        });
    }

    setDefaults(){
        this.props.note.title = this.note.title;
        this.props.note.category = this.note.category;
        this.props.note.date = this.note.date;
        this.props.note.content = this.note.content;
    }


    render () {

        return (
            <div className="note">
                <div className="title-container">
                    <input className="note-title" ref={this.titleRef} type="text" onChange={(e) => this.handleChanges(e, true)} data-name="title" defaultValue={this.props.note.title}/>
                    <a className="btn btn-top hide" onClick={() => this.props.scrollToContent(true)}>Note List</a>
                </div>
                <div className="note-info">
                    <p className="category-text">Category</p>
                    <input className="note-category" ref={this.categoryRef} type="text" onChange={this.handleChanges} data-name="category" defaultValue={this.props.note.category}/>
                    <p>•</p>
                    <p>Date</p>
                    <input className="note-date" ref={this.dateRef} type="date" onChange={this.handleChanges} data-name="date" defaultValue={this.props.note.date}/>
                    <span onClick={() => this.props.deleteNote(this.props.note.id)} className="fa fa-trash"></span>

                    {
                    this.state.changes &&
                     <a className="btn btn-save-lite" onClick={() => {
                        this.props.onSave(this.note);
                        this.saveChanges();
                    }}>
                        Save
                    </a>
                }
                </div>
                <div className="content">
                    <textarea name="" id="" ref={this.contentRef} defaultValue={this.props.note.content} data-name="content" onChange={this.handleChanges}>
                    </textarea>
                </div>
            </div>
        );
    }
}

