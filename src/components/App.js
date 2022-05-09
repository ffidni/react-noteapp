import {Component, createRef} from 'react';
import {v4 as uuidv4} from 'uuid';
import SearchBar from './Search';
import Notes from './Notes';
import Note from './Note';
import CreateNote from './CreateNote'



class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: [
                {
                id: uuidv4(), title: 'Neymar', selected: true, category: "Sports", date: "2022-12-20", 
                content: `Ipsum laborum adipisicing aute consequat officia deserunt. Non Lorem sunt ut pariatur occaecat commodo dolore dolore veniam exercitation non ad consectetur labore. Aliquip officia exercitation consequat laboris. Enim irure eu sunt officia aliquip veniam duis aliqua aliquip do id enim mollit eu. Id deserunt voluptate nostrud sint aliqua consequat. Aliquip id laborum enim veniam ipsum quis ut. Id velit et amet esse mollit aliquip laboris consectetur fugiat magna non non.
                
Nulla labore reprehenderit in commodo laboris sint pariatur aliquip laboris aute voluptate incididunt. Aute proident eiusmod occaecat ipsum aliquip laboris sunt nulla esse id cillum. Amet ut excepteur culpa nisi mollit ex minim. Nisi qui Lorem duis ut id ea culpa officia ut excepteur nulla. Duis occaecat est qui aute deserunt aliqua aute dolore labore ad ipsum adipisicing proident.
                `
                },
                
                {
                id: uuidv4(), title: 'Python', selected: false, category: "Programming", date: "2022-12-21", 
                content: `Labore labore qui qui aute laboris nulla. Lorem aliquip tempor laborum consectetur exercitation dolor. Occaecat labore magna deserunt sint laborum cillum eu dolore nostrud elit commodo.
                `
                }
            ],
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

    componentDidMount () {
        if (!this.state.focusNote) {
            this.setState({
                focusNote: this.state.notes[0]
            });
        }

    }

    selectNote(note) {
        this.setState({
            focusNote: note
        })
    }

    saveHandle(note){
        const oldNotes = [...this.state.notes];
        oldNotes[oldNotes.indexOf(oldNotes.find((target) => target.id === note.id))] = note;
        this.setState({
            notes: oldNotes
        });
    }



    createNote(name, category, date){
        this.setState((prevState) => {
            var newNotes = [...this.state.notes]
            const newNote = {id: uuidv4(), selected: true, title: name, category, date, content: "Let's Write!"};
            newNotes.map((note) => note.selected = false);
            newNotes.push(newNote);
            return {notes: newNotes, focusNote: newNote, showDialog: false};
        });
        this.scrollToContent();
    }

    scrollToContent (top = false) {
        window.scrollTo({
            top: top ? 0 : this.noteRef.current.contentRef.current.offsetTop,
            behavior: 'smooth',
            }   
        );
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
                <div>
                <SearchBar filterNotes={this.filterNotes} searchRef={this.searchRef}/>
                {
                    filtered === null ? <h4 className="no-match">No Match.</h4> : <Notes key={notes.length} scrollToContent={this.scrollToContent} noteRef={this.noteRef} notes={filtered.length > 0 ? filtered : notes} selectNote={this.selectNote}/>
                }
                <a className="btn btn-add" onClick={this.showDialog}>Create</a>
                </div>
                <Note ref={this.noteRef} scrollToContent={this.scrollToContent} note={focusNote} key={focusNote.id} onSave={this.saveHandle}/>
            </>
        );
    }
}

export default App;
