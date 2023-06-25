import React, { Fragment, useEffect } from 'react';

//  importing utils
import PropTypes from 'prop-types';

//  importing styles
import styles from './SnippetsRadioList.module.scss';

function SnippetsRadioList({ snippets, setSelectedSnippet }) {
  // call passed in function on changed button, should find a way to do this without having to iterate through snippet array. store the snippet on the input itself somehow?
  const onChangeValue = (e) => {
    if (!setSelectedSnippet) return;
    setSelectedSnippet(buttonMapper[e.target.id]);
  };

  const buttonMapper = {};
  const buttonList = [];

  if (snippets) {
    snippets.forEach((el, i) => {
      const currButton = (
        <Fragment key={`snippet-tag-${i}`}>
          <input
            name="snippetList"
            type="radio"
            id={`snippet-input-${i}`}
            value={el._id}
            key={i}
          />
          <label htmlFor={`snippet-input-${i}`} key={`snippet-label-${i}`}>
            <div className={styles.labelHeader}>
              <h6>{el.title} </h6>
              <span>{el.language}</span>
            </div>
            <p className="text-truncate">{el.storedCode}</p>
          </label>
          <hr />
        </Fragment>
      );

      buttonMapper[`snippet-input-${i}`] = el;
      buttonList.push(currButton);
    });
  }

  return (
    <React.Fragment>
      <div
        className={`${styles.snippetGroup}`}
        onChange={(e) => onChangeValue(e)}
      >
        {buttonList}
      </div>
    </React.Fragment>
  );
}

SnippetsRadioList.propTypes = {
  snippets: PropTypes.array,
  setSelectedSnippet: PropTypes.func
};

export default SnippetsRadioList;
