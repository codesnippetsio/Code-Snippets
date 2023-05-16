import React, { useState } from 'react';

//  importing child components
import SaveModal from '../../components/AddSnippet/SaveModal.jsx';
import TagInput from '../../components/ui/TagInput/TagInput';

//  importing external functionality
import CodeMirror from '@uiw/react-codemirror';
import PropTypes from 'prop-types';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { langs } from '@uiw/codemirror-extensions-langs';

//  importing utils
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

//  importing styles
import styles from './AddSnippet.module.scss';

//  importing data
import { LANGUAGES } from '../../data/data.js';

const AddSnippet = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [comments, setComments] = useState('');
  const [storedCode, setStoredCode] = useState('');
  const [tagList, setTags] = useState('');
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (title === '') {
      setError(true);
      return;
    } else {
      setOpenModal(true);
      setError(false);
    }

    fetch('/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        language: language,
        comments: comments,
        tags: tagList,
        storedCode: storedCode
      })
    })
      .then((data) => data.json())
      .catch((err) => {
        console.log(err);
        console.log('failed saving snippet');
      });
<<<<<<< HEAD
=======

    // setTitle('');
    // setLanguage('');
    // setComments('');
    // setStoredCode('');
>>>>>>> dev
  }

  // wrapper function for setTags to send to TagInput
  function setTagsWrapper(tags) {
    setTags(tags);
  }

  return (
    <div className='modalBackground'>
      <div className='modalContainer modal show'>
        <Modal
          className={styles.modal}
          show={true}
          onHide={() => closeModal(false)}
          size='xl'
          aria-labelledby='contained-modal-title-vcenter'
          centered>
          <Modal.Header className={styles.header}>
<<<<<<< HEAD
            <Modal.Title className='col-12 text-center'>
=======
            <Modal.Title className="col-12 text-center">
>>>>>>> dev
              Add a snippet
            </Modal.Title>
          </Modal.Header>
          <br />

          <div className={styles.codeSnippet}>
            <label htmlFor={'newSnippetTitle'}>Title: </label>
            <input
              id="newSnippetTitle"
              className={styles.title}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
<<<<<<< HEAD
              }}></input>
            {error && <span className='error'>Title is required!</span>}
=======
              }}
            ></input>
            {error && <span className="error">Title is required!</span>}
>>>>>>> dev
            <br />
            <br />

            <label htmlFor="newSnippetLanguage">Language: </label>
            <select
              id="newSnippetLanguage"
              className={styles.language}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}>
              {LANGUAGES.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            <br />
            <br />

            <label htmlFor="newSnippetComments">Comments: </label>
            <input
              id="newSnippetComments"
              className={styles.comments}
              value={comments}
              onChange={(e) => {
                setComments(e.target.value);
              }}></input>
            <br />
            <br />

            <label htmlFor="newSnippetTags">Tags: </label>
            <TagInput
              id="newSnippetTags"
              className={styles.tags}
              onChange={setTagsWrapper}
            />
            <hr />

            <h5 className='px-2'>Enter code:</h5>
            <CodeMirror
              className={styles.editor}
              height='500px'
              id='storedCode'
              // value={storedCode}
              extensions={[langs.tsx()]}
              placeholder={
                "const sayHi = () => {\n  console.log('Hello World!')\n}"
              }
<<<<<<< HEAD
              onChange={(e) => setStoredCode(e)}></CodeMirror>
          </div>

          <Modal.Footer>
            {openModal && <SaveModal />}
            <Button variant='secondary' onClick={() => closeModal(false)}>
=======
              onChange={(e) => setStoredCode(e)}
            ></CodeMirror>
            {/* <input
              id='storedCode'
              value={storedCode}
              onChange={(e) => {
                setStoredCode(e.target.value);
              }}
            ></input> */}
          </div>

          <Modal.Footer>
            {openModal && <SaveModal closeModal={setOpenModal} />}
            <Button variant="secondary" onClick={() => closeModal(false)}>
>>>>>>> dev
              Close
            </Button>
            <Button
              variant='primary'
              className='saveButton'
              onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

AddSnippet.propTypes = {
  closeModal: PropTypes.func
};

export default AddSnippet;
