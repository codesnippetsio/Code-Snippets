import React, { useState } from 'react';
// import Snippet from 
import { CopyToClipboard } from 'react-copy-to-clipboard';


const SnippetDisplay = ({ selectedSnippet, getSnippet }) =>{
    // indSnippet = this.props
    // create delete method using fetch request 
    const snippetTitle = selectedSnippet.title ? selectedSnippet.title : '';
    const snippetLanguage = selectedSnippet.language ? selectedSnippet.language : '';
    const snippetComments = selectedSnippet.comments ? selectedSnippet.comments : '';
    const snippetStoredCode = selectedSnippet.storedCode ? selectedSnippet.storedCode : '';
    const snippetTagList = selectedSnippet.tagList ? selectedSnippet.tagList : '';

    
    // create a state variable for each passed down state and the its setState function 
    // const [title, setTitle] = useState([]);
    const [language, setLanguage] = useState(snippetTitle);
    const [comments, setComments] = useState(snippetLanguage);
    const [storedCode, setStoredCode] = useState(snippetStoredCode);
    const [tagList, setTags] = useState(snippetTagList);
    const [editButtonState, setEditButtonState] = useState(false);

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

    const editSnippet = (_id) => {
        // const [oldState, setOldState] = React.useState([]);
        // create an object (eventually will hold the updated state)
            const updatedSnippet = {};
        // within fetch request (post)
            // body: JSON.stringify(created object)
            fetch (`/snippets?id=${_id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedSnippet)
            })
            .then((response) => {
                response.json()
                getSnippet()
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

    // create fnc updateValue

    // create an empty array
        // iterate through props array (tags) 
        // for each element push the react component 

    // update the state to edit mode if clicked 
    
    // create a func that checks if the edit button is clicked
        // if edit button is clicked 
    const checkEdit = ({ editButtonState }) => {
        if (editButtonState === true) {
        return(
        <div className='entireSnippetDisplay'>
            <div className='displayContainer'>
                <input className="titleEdit" onChange={(e) => {setTitle(e.target.value)}}> <span> Title: </span> {snippetTitle}</input>
                <input className="languageEdit" onChange={(e) => {setLanguage(e.target.value)}}> <span> Language: </span> {snippetLanguage}</input>
                <input className="commentsEdit" onChange={(e) => {setComments(e.target.value)}}> <span> Comments: </span> {snippetComments}</input>
                <TagInput onChange={setTagsWrapper}/>
                {/* <input className="tagsEdit" onChange={(e) => {setTags}}> <span> Title: </span> {snippetTagList}</input> */}
            </div>

            <CodeMirror
              className={styles.editor}
              height='500px'
              id='storedCode'
              value={snippetStoredCode}
              extensions={[langs.tsx()]}
            //   placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
              onChange={(e) => setStoredCode(e)}
            ><CopyToClipboard text={snippetStoredCode}
            onCopy = {() => setCopied(true)}> 
            <button className='copyButton'> Copy Code Snippet </button>
            </CopyToClipboard>
            </CodeMirror>


            <button
                className="saveEditButton"
                onClick={() => {
                editSnippet(selectedSnippet._id);
                setEditButtonState(false);
                }}>
                Save Edit
            </button>

        </div>
        )}

        if (editButtonState === false) {
            return(
        <div className='entireSnippetDisplay'>

        <div className="displayContainer"> 
            <p className="titleDisplay"> <span> Title: </span> {snippetTitle}</p>
            <p className="languageDisplay"> <span> Language: </span> {snippetLanguage}</p>
            <p className="commentsDisplay"> <span> Comments: </span> {snippetComments}</p>
            <p className="tagsDisplay"> <span> Tags: </span> {snippetTagList}</p>
        </div>

        <CodeMirror
              className={styles.editor}
              height='500px'
              id='storedCode'
              value={snippetStoredCode}
              extensions={[langs.tsx()]}
            //   placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
              options={{
                readOnly: true
              }}
              onChange={(e) => setStoredCode(e)}
            ><CopyToClipboard text={snippetStoredCode}
            onCopy = {() => setCopied(true)}> 
            <button className='copyButton'> Copy Code Snippet </button>
            </CopyToClipboard>
            </CodeMirror>

        <div>
            <button
                className="deleteButton"
                onClick={() => {deleteSnippet(selectedSnippet._id)}}>
                Delete Snippet 
            </button>
            <button
                className="editButton"
                onClick={() => {
                editSnippet(selectedSnippet._id);
                setEditButtonState(true);
                }}>
                Edit Snippet 
            </button>
        </div>

        {/* <div>
             <p className='codeDisplay' value={snippetStoredCode}> <span>Code Snippet:</span>{snippetStoredCode} </p>
             <CopyToClipboard text={snippetStoredCode}
             onCopy = {() => setCopied(true)}> 
                <button className='copyButton'> Copy Code Snippet </button>
            </CopyToClipboard>
            { copied ? <span className='copiedAffirm'> Code Copied! </span>: null}
        </div> */}

        </div>
        )}
    }
    
    return (
        <> {checkEdit()} 
        </>
    );
}

export default SnippetDisplay;
