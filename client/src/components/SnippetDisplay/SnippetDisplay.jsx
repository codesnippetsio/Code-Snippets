import React, { useState } from 'react';
// import Snippet from
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CodeMirror from '@uiw/react-codemirror';
import styles from './SnippetDisplay.module.scss';
import { langs } from '@uiw/codemirror-extensions-langs';
import TagInput from '../../components/ui/TagInput/TagInput';
import { Card, Button } from 'react-bootstrap';
const SnippetDisplay = ({ selectedSnippet, getSnippet }) => {
  // copy code state
  const [copied, setCopied] = useState(false);
  const [editButtonState, setEditButtonState] = useState(false);
  //TODO: Pull userId from global state
  //FIXME: HARDCODING USER ID FOR NOW
  const userId = '6463eb52ab99bf89a84a3ebd';
  // indSnippet = this.props
  // create delete method using fetch request

  let snippetTitle = selectedSnippet.title ? selectedSnippet.title : '';
  let snippetLanguage = selectedSnippet.language
    ? selectedSnippet.language
    : '';
  let snippetComments = selectedSnippet.comments
    ? selectedSnippet.comments
    : '';
  let snippetStoredCode = selectedSnippet.storedCode
    ? selectedSnippet.storedCode
    : '';
  let snippetTagList = selectedSnippet.tags ? selectedSnippet.tags : [];

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

  const editSnippet = (id) => {
    const updatedSnippet = {
      title: snippetTitle,
      comments: snippetComments,
      storedCode: snippetStoredCode,
      tags: snippetTagList,
      language: snippetLanguage
    };

    fetch('/snippets?' + new URLSearchParams({ _id: id }), {
      method: 'PUT',
      body: JSON.stringify(updatedSnippet)
    })
      .then((response) => {
        //Are we using this response anywhere? IF not, delete this.
        //response.json();
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

  const checkEdit = () => {
    if (editButtonState === true) {
      return (
        <div className={styles.entireSnippetDisplay}>
          <div className="displayContainer">
            <span className="title"> Title: </span>
            <input
              defaultValue={snippetTitle}
              className="titleEdit"
              onChange={(e) => {
                snippetTitle = e.target.value;
              }}
            ></input>

            <span className="language"> Language: </span>
            <input
              defaultValue={snippetLanguage}
              className="languageEdit"
              onChange={(e) => {
                snippetLanguage = e.target.value;
              }}
            ></input>

            <span className="comments"> Comments: </span>
            <input
              defaultValue={snippetComments}
              className="commentsEdit"
              onChange={(e) => {
                snippetComments = e.target.value;
              }}
            ></input>

            <TagInput
              className="tags"
              onChange={(e) => (snippetTagList = e)}
              tags={snippetTagList}
            />
            {/* <input className="tagsEdit" onChange={(e) => {setTags}}> <span> Title: </span> {snippetTagList}</input> */}
          </div>

          <CodeMirror
            className={styles.editor}
            height="500px"
            id="storedCode"
            value={snippetStoredCode}
            extensions={[langs.tsx()]}
            //   placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
            onChange={(e) => (snippetStoredCode = e)}
          >
            <CopyToClipboard
              text={snippetStoredCode}
              onCopy={() => setCopied(true)}
            >
              <Button className={styles.addButton}> Copy Code Snippet </Button>
            </CopyToClipboard>
          </CodeMirror>

          <Button
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
    }

    if (editButtonState === false) {
      return (
        <div className={styles.entireSnippetDisplay}>
          <div className="displayContainer">
            <p className="title">
              {snippetTitle}
              <span className="title"> Title: </span> {snippetTitle}
            </p>
            <p className="language">
              {snippetLanguage}
              <span> Language: </span> {snippetLanguage}
            </p>
            <p className="comments">
              {snippetComments}
              <span> Comments: </span> {snippetComments}
            </p>
            <TagInput className="tags" tags={snippetTagList} />
            {/* <div className="tagContainer">{renderTags()}</div> */}
          </div>

          <CodeMirror
            className={styles.editor}
            height="500px"
            id="storedCode"
            value={snippetStoredCode}
            extensions={[langs.tsx()]}
            //   placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
            options={{
              readOnly: true
            }}
            onChange={(e) => (snippetStoredCode = e)}
          >
            <CopyToClipboard
              text={snippetStoredCode}
              onCopy={() => setCopied(true)}
            >
              <Button className="copyButton"> Copy Code Snippet </Button>
            </CopyToClipboard>
          </CodeMirror>
        </div>
      );
    }
  };

  return (
    <>
      <Card className={styles.card}>
        {checkEdit()}

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
    </>
  );
};

SnippetDisplay.propTypes = {
  selectedSnippet: PropTypes.object,
  getSnippet: PropTypes.func
};
export default SnippetDisplay;
