import React, { Fragment } from 'react';

//  importing utils
import PropTypes from 'prop-types';

//  importing styles
import styles from './SnippetsRadioList.module.scss';

function SnippetsRadioList(props) {
  // call passed in function on changed button, should find a way to do this without having to iterate through snippet array. store the snippet on the input itself somehow?
  const onChangeValue = (e) => {
    if (!props.onChange) return;
    for (const el of props.snippets) {
      if (el.id !== undefined && el.id.toString() === e.target.value)
        props.onChange(el);
    }
  };

  const toggleButtons = [];

  if (props.snippets) {
    props.snippets.forEach((el, i) => {
      const currButton = (
        <Fragment key={i}>
          <input
            name='snippetList'
            type='radio'
            id={`snippet-input-${i}`}
            value={el.id}
            key={i}
          />
          <label htmlFor={`snippet-input-${i}`} key={`snippet-label-${i}`}>
            <div className={styles.labelHeader}>
              <h6>{el.title} </h6>
              <span>{el.language}</span>
            </div>
            <p className='text-truncate'>{el.storedCode}</p>
          </label>
          <hr />
        </Fragment>
      );

      toggleButtons.push(currButton);
    });
  }

  return (
    <React.Fragment>
      <div
        className={`${styles.snippetGroup}`}
        onChange={(e) => {
          onChangeValue(e);
        }}>
        {toggleButtons}
      </div>
    </React.Fragment>
  );
}

SnippetsRadioList.propTypes = {
  snippets: PropTypes.array,
  onChange: PropTypes.func,
};

export default SnippetsRadioList;
