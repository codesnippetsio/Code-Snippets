import React, { useState } from 'react';
import SaveModal from '../../components/AddSnippet/SaveModal.jsx';

const AddSnippet = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [comments, setComments] = useState('');
  const [storedCode, setStoredCode] = useState('');

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
        tags: [],
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

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="closeButton" onClick={() => closeModal(false)}>
          X
        </button>
        <div className="codeSnippet">
          <label>Title:</label>
          <input
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <label>Language:</label>
          <input
            id="language"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          ></input>
          <label>Comments:</label>
          <input
            id="comments"
            value={comments}
            onChange={(e) => {
              setComments(e.target.value);
            }}
          ></input>
          <input
            id="storedCode"
            value={storedCode}
            onChange={(e) => {
              setStoredCode(e.target.value);
            }}
          ></input>
        </div>

        <button className="saveButton" onClick={handleSubmit}>
          Save
        </button>
        {openModal && <SaveModal closeModal={setOpenModal}/>}
      </div>
    </div>
  );
};

export default AddSnippet;
