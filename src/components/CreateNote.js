import {Component, createRef} from 'react'


export default class CreateNote extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errors: {name: "", category: "", date: ""},
        }
        this.nameRef = createRef();
        this.categoryRef = createRef();
        this.dateRef = createRef();
    }

    render () {
        return (
         <div className="modal-background">
            <div className="modal-content">
                <h3>Create a Note</h3>
                <a className='btn btn-close' onClick={this.props.showDialog}>&times;</a>

                <div className="form">
                    <div className="row">
                        <p>Name</p>
                        <input type="text" ref={this.nameRef}/>
                        <p className="error">{this.state.errors.name}</p>
                    </div>
                    <div className="row">
                        <p>Category</p>
                        <input type="text" ref={this.categoryRef}/>
                        <p className="error">{this.state.errors.category}</p>
                    </div>
                    <div className="row">
                        <p>Date</p>
                        <input type="date" ref={this.dateRef}/>
                        <p className="error">{this.state.errors.date}</p>
                    </div>
                </div>
                <a className="btn btn-save" onClick={() => {
                    var oldErrors = {...this.state.errors};
                    if (!this.nameRef.current.value) {  
                        oldErrors.name = "This field can't be empty";
                    } else {
                        oldErrors.name = "";
                    }
                    if (!this.categoryRef.current.value) {
                        oldErrors.category = "This field can't be empty";
                    } else {
                        oldErrors.category = "";
                    }
                    if (!this.dateRef.current.value) {
                        oldErrors.date = "This field can't be empty";
                    } else {
                        oldErrors.date = "";
                    }

                    if (!oldErrors.name && !oldErrors.date && !oldErrors.category) {
                        this.props.onSave(this.nameRef.current.value, this.categoryRef.current.value, this.dateRef.current.value);
                    } else {
                        console.log(oldErrors);
                        this.setState({
                            errors: oldErrors
                        });
                    }
                    }}>Save</a>
            </div>
        </div>    
    )
    }

}
