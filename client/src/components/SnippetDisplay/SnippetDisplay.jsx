import React, { useState } from 'react';
// import Snippet from
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CodeMirror from '@uiw/react-codemirror';
import styles from './SnippetDisplay.module.scss';
import { langs } from '@uiw/codemirror-extensions-langs';
import TagInput from '../../components/ui/TagInput/TagInput';

const SnippetDisplay = ({ selectedSnippet, getSnippet }) => {
  // indSnippet = this.props
  // create delete method using fetch request
  let snippetTitle = selectedSnippet.title ? selectedSnippet.title : '';
  let snippetLanguage = selectedSnippet.language ? selectedSnippet.language : '';
  let snippetComments = selectedSnippet.comments ? selectedSnippet.comments : '';
  let snippetStoredCode = selectedSnippet.storedCode ? selectedSnippet.storedCode : '';
  let snippetTagList = selectedSnippet.tags ? selectedSnippet.tags : [];

  // create a state variable for each passed down state and the its setState function
  // const [title, setTitle] = useState(snippetTitle);
  // const [language, setLanguage] = useState(snippetLanguage);
  // const [comments, setComments] = useState(snippetComments);
  // const [storedCode, setStoredCode] = useState(snippetStoredCode);
  // const [tagList, setTags] = useState(snippetTagList);
  const [editButtonState, setEditButtonState] = useState(false);

  const deleteSnippet = (id) => {
    fetch (`http://localhost:3000/snippets?id=${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          getSnippet();
        }
      })
      .catch((err) => {
        return ({
          log: `SnippetDisiplay.deleteSnippet: Error: ${err}`,
          status: err.status || 500,
          message: 'There was an error deleting snippet.'
        })
      })
  }

  const editSnippet = (id) => {
    // const [oldState, setOldState] = React.useState([]);
    // create an object (eventually will hold the updated state)
    const updatedSnippet = {
      id: id,
      title: snippetTitle,
      comments: snippetComments,
      storedCode: snippetStoredCode,
      tags: snippetTagList,
      language: snippetLanguage
    };
    // within fetch request (post)
    // body: JSON.stringify(created object)
    fetch (`/snippets?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedSnippet)
    })
      .then((response) => {
        response.json();
        getSnippet();
      })
      .catch((err) => {
        return ({
          log: `SnippetDisplay.editSnippet: Error: ${err}`,
          status: err.status || 500,
          message: 'There was an error editing code snippet.'
        });
      });
  };
  // copy code state 
  const [copied, setCopied] = useState(false);

    
  const checkEdit = () => {
    if (editButtonState === true) {
      return(
        <div className='entireSnippetDisplay'>
          <div className='displayContainer'>

            <span className='title'> Title: </span>
            <input
              defaultValue={snippetTitle}
              className='titleEdit'
              onChange={(e) => {
                snippetTitle = e.target.value;
              }}
            >
            </input>

            <span className='language'> Language: </span>  
            <input
              defaultValue={snippetLanguage}
              className='languageEdit'
              onChange={(e) => {
                snippetLanguage = e.target.value;
              }}
            >
            </input>

            <span className='comments'> Comments: </span>
            <input
              defaultValue={snippetComments}
              className='commentsEdit'
              onChange={(e) => {
                snippetComments = e.target.value;
              }}
            >
            </input>

            <TagInput className='tags' onChange={(e)=>snippetTagList = e} tags={snippetTagList} />
            {/* <input className="tagsEdit" onChange={(e) => {setTags}}> <span> Title: </span> {snippetTagList}</input> */}
          </div>

          <CodeMirror
            className={styles.editor}
            height='500px'
            id='storedCode'
            value={snippetStoredCode}
            extensions={[langs.tsx()]}
            //   placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
            onChange={(e) => snippetStoredCode = (e)}
          >
            <CopyToClipboard
              text={snippetStoredCode}
              onCopy={() => setCopied(true)}
            >
              <button className='copyButton'> Copy Code Snippet </button>
            </CopyToClipboard>
          </CodeMirror>


          <button
            className="saveEditButton"
            onClick={() => {
              editSnippet(selectedSnippet.id);
              setEditButtonState(false);
            }}>
                Save Edit
          </button>

        </div>
      );
    }

    if (editButtonState === false) {
      return (
        <div className='entireSnippetDisplay'>

          <div className="displayContainer"> 
            <p className="title"> <span className='title'> Title: </span> {snippetTitle}</p>
            <p className="language"> <span> Language: </span> {snippetLanguage}</p>
            <p className="comments"> <span> Comments: </span> {snippetComments}</p>
            <TagInput className='tags' tags={snippetTagList}/>
            {/* <div className="tagContainer">{renderTags()}</div> */}
          </div>

          <CodeMirror
            className={styles.editor}
            height='500px'
            id='storedCode'
            value={snippetStoredCode}
            extensions={[langs.tsx()]}
            //   placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
            options={{
              readOnly: true,
            }}
            onChange={(e) => snippetStoredCode = (e)}
          >
            <CopyToClipboard
              text={snippetStoredCode}
              onCopy={() => setCopied(true)}
            >
              <button className='copyButton'> Copy Code Snippet </button>
            </CopyToClipboard>
          </CodeMirror>

        </div>
      );
    }
  };
    
  return (
    <> {checkEdit()} 

      <div>
        <button
          className="deleteButton"
          onClick={() => {deleteSnippet(selectedSnippet.id)}}>
                Delete Snippet 
        </button>
        <button
          className="editButton"
          onClick={() => {
            // editSnippet(selectedSnippet.id);
            setEditButtonState(true);
          }}>
                Edit Snippet 
        </button>
      </div>  

    </>
  );
};

export default SnippetDisplay;
