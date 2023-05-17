import React from 'react';
import styles from './SnippetDisplay.module.scss';
import { Button } from 'react-bootstrap';

const FooterButtons = ({ deleteSnippet, setEditButtonState }) => {
  return (
    <div className={styles.buttonDiv}>
      <Button
        className='deleteButton'
        onClick={() => {
          deleteSnippet(selectedSnippet.id);
        }}
      >
        Delete Snippet
      </Button>
      <Button
        className='editButton'
        onClick={() => {
          // editSnippet(selectedSnippet.id);
          setEditButtonState(true);
        }}
      >
        Edit Snippet
      </Button>
    </div>
  );
};

export default FooterButtons;
