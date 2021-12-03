import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import './Dashboard.scss';
import { addDataToAPI, deleteDataAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action';
import { withRouter } from "react-router-dom"

class Dashboard extends Component {
    state = {
        title: '',
        connect: '',
        date: '',
        textButtom: 'SIMPAN', 
        noteId: ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const { history } = this.props
        if (!userData) {
            history.push('/register') 
        }else{
            this.props.getNotes(userData.uid);
        }
    }

    handleSaveNotes = () => {
        const { title, content, textButtom, noteId } = this.state;
        const { saveNotes, updateNotes } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if(textButtom === 'SIMPAN'){
            saveNotes(data)
        }else{
            data.noteId = noteId;
            updateNotes(data)
        }

    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    updateNotes = (note) => {
        console.log(note)
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButtom: 'UPDATE',
            noteId: note.id
        })
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButtom: 'SIMPAN'
        })
    }

    deleteNotes = (e, note) => {
        e.stopPropagation();
        const {deleteNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id, 
        } 
        deleteNotes(data)
    }

    render() {
        const { title, content, textButtom } = this.state;
        const { notes } = this.props;
        const { updateNotes, cancelUpdate, deleteNotes } = this;
        return (
            <div className="container">
                <div className="input-from">
                    <input placeholder="title"
                        className="input-title"
                        value={title}
                        onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea placeholder="content"
                        className="input-content"
                        value={content}
                        onChange={(e) => this.onInputChange(e, 'content')}>

                    </textarea>
                    <div className="action-wrapper">
                        <button className="save-btn cancel"
                             onClick={cancelUpdate} >CANCEL</button>
                        <button className="save-btn"
                            onClick={this.handleSaveNotes}>{textButtom}</button>
                    </div>
                </div>
                <hr />
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => updateNotes(note)}>
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div className="delete-btn" onClick={(e) => deleteNotes(e, note)}>x</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataAPI(data))
})

export default withRouter(connect(reduxState, reduxDispatch)(Dashboard));
