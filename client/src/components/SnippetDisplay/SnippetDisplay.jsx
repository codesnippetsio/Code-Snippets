import React from 'react';
import styles from './SnippetDisplay.module.scss';
const SnippetDisplay = (props) => {




    return (
    <div className={`snippet_display ${styles.container} ${!props.collapse && styles.open}`}>
      <h1>Snippet Display</h1>
    </div>
    );
}

export default SnippetDisplay;