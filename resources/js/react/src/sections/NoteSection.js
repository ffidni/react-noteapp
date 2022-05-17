import React, {Component, createRef} from 'react';
import {v4 as uuidv4} from 'uuid';
import SearchBar from '../components/Search';
import Notes from '../components/Notes';
import Note from '../components/Note';
import CreateNote from '../components/CreateNote'



class NoteSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            filteredNotes: [],
            showDialog: false,
            focusNote: false,
        };
        this.searchRef = createRef();
        this.noteRef = createRef();
        this.filterNotes = this.filterNotes.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.selectNote = this.selectNote.bind(this);
        this.saveHandle = this.saveHandle.bind(this);
        this.createNote = this.createNote.bind(this);
        this.scrollToContent = this.scrollToContent.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    showDialog () {
        this.searchRef.current.value = "";
        this.setState((prevState) => {
            return {
                filteredNotes: [],
                showDialog: !prevState.showDialog
            }
        });
    }

    

    filterNotes(value){
        if (value) {
            value = value.toLowerCase()
            const notes = [...this.state.notes];
            const filtered = notes.filter((note) => note.title.toLowerCase().includes(value) || note.category.toLowerCase().includes(value));
            this.setState({filteredNotes: filtered.length === 0 ? null : filtered});
        } else {
            this.setState({filteredNotes: []});
        }

        

    }

    async componentDidMount () {
        let err = false;
        const result = await fetch(window.NOTESAPI + '?' + new URLSearchParams({"user_id": window.userID}),
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
        .catch((err) => {err = true; return err});

        console.log(result);

        if (err) {
            this.props.setAlert({type: "failed", text: result.toString()}, false);
        } else {
            this.setState({notes: result, focusNote: result.find((note) => note.id === window.selectedNote)});
        }
    }

    async selectNote(note) {
        const result = await fetch(window.USERSAPI, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': "no-cache",
              },
            body: JSON.stringify({note_id: note.id, user_id: window.userID, update: "1"})
        })
        .then((response) => response.json())
        .then((result) => result)
        .catch((err) => err)
        
        if (result.hasOwnProperty("status")) {
            window.selectedNote = note.id;
            this.setState({focusNote: note});
        } else {
            this.props.setAlert({type: "failed", text: result.toString()});
        }
    }

    async saveHandle(note){
        note.update = "1";
        note.user_id = window.userID;
        const result = await fetch(window.NOTESAPI, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
          })
          .then((response) => response.json())
          .then((result) => result)
          .catch((err) => err)

        
          if (result.hasOwnProperty("status")) {
            const oldNotes = [...this.state.notes];
            oldNotes[oldNotes.indexOf(oldNotes.find((target) => target.id === note.id))] = note;
            this.setState({
                notes: oldNotes
            });
            this.props.setAlert({type: "success", text: "Changes has been saved."});
          } else {
              this.props.setAlert({type: "failed", text: result.toString()}, false);
          }
    }

    async createNote(name, category, date){
        const newNote = {id: uuidv4(), title: name, category: category, date: date, content: "Let's Write!", user_id: window.userID};
        const result = await fetch(window.NOTESAPI, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
          })
          .then((response) => response.json())
          .then((result) => result)
          .catch((err) => err)

          this.selectNote(newNote);

        
          if (result.hasOwnProperty("status")) {
            this.setState((prevState) => {
                var newNotes = [...prevState.notes]
                window.selectedNote = newNote.id;
                newNotes.push(newNote);
                return {notes: newNotes, showDialog: false};
            });
            this.scrollToContent();
            this.props.setAlert({type: "success", text: "New note has been created."})
          } else {
              this.props.setAlert({type: "failed", text: result.toString()}, false);
          }

    }

    scrollToContent (top = false) {
        window.scrollTo({
            top: top ? 0 : this.noteRef.current.contentRef.current.offsetTop,
            behavior: 'smooth',
            }   
        );
    }

    async deleteNote (id) {
        const result = await fetch(window.NOTESAPI + `/${id}`, {
            method: "DELETE",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache",
            },
        })
        .then((response) => response.json())
        .then((result) => result)
        .catch((err) => err);

        console.log(result);

        if (result.hasOwnProperty("status")) {
            this.props.setAlert({type: "success", text: `A note with the title ${this.state.notes.find((note) => note.id === id).title} has been deleted.`})
            this.setState((prevStates) => {
                const oldNotes = [...prevStates.notes];
                const oldIndex = oldNotes.indexOf(oldNotes.find((note) => note.id === id));
                const filteredNotes = oldNotes.filter((note) => note.id !== id);
                var focusNote;
                if (oldNotes.length > 1) {
                    if (oldIndex === 0) {
                        window.selectedNote = oldNotes[oldIndex+1].id;  
                        focusNote = oldNotes[oldIndex+1];
                    } else {
                        window.selectedNote = oldNotes[oldIndex-1].id;
                        focusNote = oldNotes[oldIndex-1];
                    }
                } else {
                    window.selectedNote = null;
                    focusNote = null;
                }
                this.selectNote(focusNote);
                return {
                    notes: filteredNotes,
                }
            });
        } else {
            this.props.setAlert({type: "failed", text: result.toString()});
        }

    }


    render () {
        const notes = this.state.notes;
        const filtered = this.state.filteredNotes;
        var focusNote = this.state.focusNote;
        return (
            <>
                {this.state.showDialog && 
                    <CreateNote showDialog={this.showDialog} onSave={this.createNote}/>
                } 
                <div className="first-flex">

                <SearchBar filterNotes={this.filterNotes} searchRef={this.searchRef}/>
                {
                    filtered === null ? <h4 className="no-match">No Match.</h4> : <Notes key={notes.length} deleteNote={this.deleteNote} selectedNote={window.selectedNote} scrollToContent={this.scrollToContent} noteRef={this.noteRef} notes={filtered.length > 0 ? filtered : notes} selectNote={this.selectNote}/>
                }
                <a className="btn btn-add" onClick={this.showDialog}>Create</a>
                </div>
                {
                    this.state.notes.length > 0 &&
                    <Note ref={this.noteRef} logout={this.logout} scrollToContent={this.scrollToContent} selectNote={this.selectNote} deleteNote={this.deleteNote} note={focusNote} key={focusNote.id} onSave={this.saveHandle}/>

                }
            </>
        );
    }
}

export default NoteSection;
