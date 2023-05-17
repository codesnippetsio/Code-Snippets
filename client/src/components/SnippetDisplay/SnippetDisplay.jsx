import React, { useState, useEffect } from 'react';

//  importing child components
import TagInput from '../../components/ui/TagInput/TagInput';

//  importing external functionality
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CodeMirror from '@uiw/react-codemirror';
import styles from './SnippetDisplay.module.scss';
import { langs } from '@uiw/codemirror-extensions-langs';

//  importing utils
import { Card, Button } from 'react-bootstrap';

const SnippetDisplay = ({ selectedSnippet, getSnippet }) => {
  const defaultDisplayValues = {
    title: '',
    language: '',
    comments: '',
    storedCode: '',
    tags: []
  };

  const [copied, setCopied] = useState(false);
  const [editButtonState, setEditButtonState] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState(defaultDisplayValues);
  //TODO: Pull userId from global state
  //FIXME: HARDCODING USER ID FOR NOW
  const userId = '6463eb52ab99bf89a84a3ebd';
  // indSnippet = this.props
  // create delete method using fetch request

  useEffect(() => {
    setCurrentDisplay(selectedSnippet);
  }, [selectedSnippet, getSnippet]);

  const deleteSnippet = (snippetId, userId) => {
    fetch('/snippets?' + new URLSearchParams({ snippetId, userId }), {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          getSnippet();
        }
      })
      .catch((err) => {
        return {
          log: `SnippetDisiplay.deleteSnippet: Error: ${err}`,
          status: err.status,
          message: 'There was an error deleting snippet.'
        };
      });
  };

  const editSnippet = (snippetId) => {
    fetch(`/snippets?${new URLSearchParams({ snippetId, userId })}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(currentDisplay)
    })
      .then((response) => {
        //Are we using this response anywhere? IF not, delete this.
        return response.json();
      })
      .then((data) => {
        console.log(data);
        getSnippet();
      })
      .catch((err) => {
        //What's happening here? Where is this being returned to?
        return {
          log: `SnippetDisplay.editSnippet: Error: ${err}`,
          status: err.status,
          message: 'There was an error editing code snippet.'
        };
      });
  };

  const displayContent = (
    <div className={styles.entireSnippetDisplay}>
      <div className="displayContainer">
        <span className="title"> Title: </span>
        <input
          defaultValue={currentDisplay.title}
          className="titleEdit"
          onChange={(e) => {
            if (editButtonState) {
              setCurrentDisplay({ ...currentDisplay, title: e.target.value });
            }
          }}
        ></input>

        <span className="language"> Language: </span>
        <input
          defaultValue={currentDisplay.language}
          className="languageEdit"
          onChange={(e) => {
            if (editButtonState) {
              setCurrentDisplay({
                ...currentDisplay,
                language: e.target.value
              });
            }
          }}
        ></input>

        <span className="comments"> Comments: </span>
        <input
          defaultValue={currentDisplay.comments}
          className="commentsEdit"
          onChange={(e) => {
            if (editButtonState) {
              setCurrentDisplay({
                ...currentDisplay,
                comments: e.target.value
              });
            }
          }}
        ></input>

        <TagInput
          className="tags"
          onChange={(e) => {
            if (editButtonState) {
              setCurrentDisplay({ ...currentDisplay, tags: e });
            }
          }}
          defaultTags={currentDisplay.tags}
        />
        {/* <input className="tagsEdit" onChange={(e) => {setTags}}> <span> Title: </span> {snippetTagList}</input> */}
      </div>

      <CodeMirror
        className={styles.editor}
        height="500px"
        id="storedCode"
        value={currentDisplay.storedCode}
        extensions={[langs.tsx()]}
        //   placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
        onChange={(e) => {
          setCurrentDisplay({ ...currentDisplay, storedCode: e });
        }}
      >
        <CopyToClipboard
          text={currentDisplay.storedCode}
          onCopy={() => setCopied(true)}
        >
          <Button className={styles.addButton}> Copy Code Snippet </Button>
        </CopyToClipboard>
      </CodeMirror>

      <Button
        style={{ display: editButtonState ? 'flex' : 'none' }}
        className="saveEditButton"
        onClick={() => {
          console.dir(selectedSnippet);
          editSnippet(selectedSnippet._id);
          setEditButtonState(false);
        }}
      >
        Save Edit
      </Button>
    </div>
  );
  // const checkEdit = () => {
  //   if (editButtonState === true) {
  //     return (
  //       <div className={styles.entireSnippetDisplay}>
  //         <div className="displayContainer">
  //           <span className="title"> Title: </span>
  //           <input
  //             defaultValue={snippetTitle}
  //             className="titleEdit"
  //             onChange={(e) => {
  //               snippetTitle = e.target.value;
  //             }}
  //           ></input>

  //           <span className="language"> Language: </span>
  //           <input
  //             defaultValue={snippetLanguage}
  //             className="languageEdit"
  //             onChange={(e) => {
  //               snippetLanguage = e.target.value;
  //             }}
  //           ></input>

  //           <span className="comments"> Comments: </span>
  //           <input
  //             defaultValue={snippetComments}
  //             className="commentsEdit"
  //             onChange={(e) => {
  //               snippetComments = e.target.value;
  //             }}
  //           ></input>

  //           <TagInput
  //             className="tags"
  //             onChange={(e) => (snippetTagList = e)}
  //             tags={snippetTagList}
  //           />
  //           {/* <input className="tagsEdit" onChange={(e) => {setTags}}> <span> Title: </span> {snippetTagList}</input> */}
  //         </div>

  //         <CodeMirror
  //           className={styles.editor}
  //           height="500px"
  //           id="storedCode"
  //           value={snippetStoredCode}
  //           extensions={[langs.tsx()]}
  //           //   placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
  //           onChange={(e) => (snippetStoredCode = e)}
  //         >
  //           <CopyToClipboard
  //             text={snippetStoredCode}
  //             onCopy={() => setCopied(true)}
  //           >
  //             <Button className={styles.addButton}> Copy Code Snippet </Button>
  //           </CopyToClipboard>
  //         </CodeMirror>

  //         <Button
  //           className="saveEditButton"
  //           onClick={() => {
  //             console.dir(selectedSnippet);
  //             editSnippet(selectedSnippet._id);
  //             setEditButtonState(false);
  //           }}
  //         >
  //           Save Edit
  //         </Button>
  //       </div>
  //     );
  //   }

  //   if (editButtonState === false) {
  //     return (
  //       <div className={styles.entireSnippetDisplay}>
  //         <div className="displayContainer">
  //           <p className="title">
  //             {snippetTitle}
  //             <span className="title"> Title: </span> {snippetTitle}
  //           </p>
  //           <p className="language">
  //             {snippetLanguage}
  //             <span> Language: </span> {snippetLanguage}
  //           </p>
  //           <p className="comments">
  //             {snippetComments}
  //             <span> Comments: </span> {snippetComments}
  //           </p>
  //           <TagInput className="tags" tags={snippetTagList} />
  //           {/* <div className="tagContainer">{renderTags()}</div> */}
  //         </div>

  //         <CodeMirror
  //           className={styles.editor}
  //           height="500px"
  //           id="storedCode"
  //           value={snippetStoredCode}
  //           extensions={[langs.tsx()]}
  //           //   placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
  //           options={{
  //             readOnly: true
  //           }}
  //           onChange={(e) => (snippetStoredCode = e)}
  //         >
  //           <CopyToClipboard
  //             text={snippetStoredCode}
  //             onCopy={() => setCopied(true)}
  //           >
  //             <Button className="copyButton"> Copy Code Snippet </Button>
  //           </CopyToClipboard>
  //         </CodeMirror>
  //       </div>
  //     );
  //   }
  // };

  return (
    <React.Fragment>
      <Card className={styles.card}>
        {displayContent}

        <div className={styles.buttonDiv}>
          <Button
            className="deleteButton"
            onClick={() => {
              deleteSnippet(selectedSnippet._id, userId);
            }}
          >
            Delete Snippet
          </Button>
          <Button
            className="editButton"
            onClick={() => {
              //editSnippet(selectedSnippet.id);
              setEditButtonState(true);
            }}
          >
            Edit Snippet
          </Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

SnippetDisplay.propTypes = {
  selectedSnippet: PropTypes.object,
  getSnippet: PropTypes.func
};
export default SnippetDisplay;
