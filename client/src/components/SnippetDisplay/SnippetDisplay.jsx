import React, { useState } from 'react';
// import Snippet from 
import { CopyToClipboard } from 'react-copy-to-clipboard';

const SnippetDisplay = ({ indSnippet }) =>{
    // indSnippet = this.props
    // create delete method using fetch request 

    // create a state variable for each passed down state and the its setState function 
    const [title, setTitle] = useState([]);


    const deleteSnippet = (_id) => {
        fetch (`/snippets?id=${_id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            response.json()
        })
        .catch((err) => {
            return next({
                log: `SnippetDisiplay.deleteSnippet: Error: ${err}`,
                status: err.status || 500,
                message: 'There was an error deleting snippet.'
            })
        })
    }
    // patch request

    // pass down get request from display sidebar and call it after edit snippet
    // populating object with updated state 

    //patch request instead?? 
    //have a button for after edit feature (save edit) 
    // this will hold the state as 
    // make patch request at the end, not individual patch request for each p tag thats edited 

    const editSnippet = (_id) => {
        const [oldState, setOldState] = React.useState([]);
        // create an object (eventually will hold the updated state)
            const updatedSnippet = {};
        // within fetch request (post)
            // body: JSON.stringify(created object)
            fetch (`/snippets?id=${_id}`, {
                method: 'POST',
                body: JSON.stringify(updatedSnippet)
            })
            .then((response) => {
                response.json()
            })
            .catch((err) => {
                return next({
                    log: `SnippetDisplay.editSnippet: Error: ${err}`,
                    status: err.status || 500,
                    message: 'There was an error editing code snippet.'
                })
            })
    } 
    // copy code state 
    const [copied, setCopied] = useState(false);

    // create an empty array
        // iterate through props array (tags) 
        // for each element push the react component 
    
    return (
    <div className="snippet_display">

      <div className="displayContainer"> 
        <p className="titleDisplay"> <span> Title: </span> {this.props.title}</p>
        <p className="languageDisplay"> <span> Language: </span> {this.props.language}</p>
        <p className="commentsDisplay"> <span> Comments: </span> {this.props.comments}</p>
        <p className="tagsDisplay"> <span> Tags: </span> {tagArray}</p>
      </div>

      <div>
        <p className='codeDisplay' value={this.props.storedCode}> <span>Code Snippet:</span>{this.props.storedCode} </p>
        <CopyToClipboard text={this.props.storedCode}
          onCopy = {() => setCopied(true)}> 
            <button className='copyButton'> Copy Code Snippet </button>
        </CopyToClipboard>
        { copied ? <span className='copiedAffirm'> Code Copied! </span>: null}
      </div>

      <div>
        <button
            className="deleteButton"
            id={this.props._id}
            onClick={() => {deleteSnippet(this.props._id)}}>
            Delete Snippet 
      </button>
      <button
            className="editButton"
            id={this.props._id}
            onClick={() => {editSnippet(this.props._id)}}>
            Edit Snippet 
        </button>
      </div>
    </div>
    );
}

export default SnippetDisplay;
