import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { langs } from '@uiw/codemirror-extensions-langs';
import styles from './AddSnippet.module.scss';
import React, { useState } from 'react';
import SaveModal from '../../components/AddSnippet/SaveModal.jsx';
import TagInput from '../../components/ui/TagInput/TagInput';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddSnippet = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [comments, setComments] = useState('');
  const [storedCode, setStoredCode] = useState('');
  const [tagList, setTags] = useState('');

  const [openModal, setOpenModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        language: language,
        comments: comments,
        tags: tagList,
        storedCode: storedCode,
      }),
    })
      .then((data) => data.json())
      .catch((err) => {
        console.log(err);
        console.log('failed saving snippet');
      });

    setOpenModal(true);
    // setTitle('');
    // setLanguage('');
    // setComments('');
    // setStoredCode('');
  }

  // wrapper function for setTags to send to TagInput
  function setTagsWrapper(tags) {
    setTags(tags);
  }

  return (
    <div className='modalBackground'>
      <div className='modalContainer modal show'>
        <Modal
          show={true}
          onHide={() => closeModal(false)}
          size='xl'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add a snippet</Modal.Title>
          </Modal.Header>
          <div className='codeSnippet'>
            <label>Title:</label>
            <input
              id='title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <label>Language:</label>
            <input
              id='language'
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            ></input>
            <label>Comments:</label>
            <input
              id='comments'
              value={comments}
              onChange={(e) => {
                setComments(e.target.value);
              }}
            ></input>
            <br />
            <label>Tags:</label>
            <TagInput onChange={setTagsWrapper} tags={['react', 'express']}/>
            <br />
            <hr/>
            <h5 className='px-2'>Enter code:</h5>
            <CodeMirror
              className={styles.editor}
              height='500px'
              id='storedCode'
              // value={storedCode}
              extensions={[langs.tsx()]}
              placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
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
            <Button variant='secondary' onClick={() => closeModal(false)}>
              Close
            </Button>
            <Button
              variant='primary'
              className='saveButton'
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Modal.Footer>
          {openModal && <SaveModal closeModal={setOpenModal} />}
        </Modal>
      </div>
    </div>
  );
};

export default AddSnippet;
