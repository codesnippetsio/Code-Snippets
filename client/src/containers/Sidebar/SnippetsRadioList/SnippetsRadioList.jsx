import React, { Fragment } from 'react';

//  importing utils
import PropTypes from 'prop-types';

//  importing styles
import styles from './SnippetsRadioList.module.scss';

function SnippetsRadioList({ snippets, onChange }) {
  // call passed in function on changed button, should find a way to do this without having to iterate through snippet array. store the snippet on the input itself somehow?
  const onChangeValue = (e) => {
    console.log(e);
    if (!onChange) return;
    onChange(buttonMapper[e.target.id]);
  };

  const buttonMapper = {};
  const buttonList = [];

  if (snippets) {
    snippets.forEach((el, i) => {
      const currButton =
        i === 0 ? (
          <Fragment key={`snippet-tag-${i}`}>
            <input
              name="snippetList"
              type="radio"
              id={`snippet-input-${i}`}
              value={el._id}
              defaultChecked
              key={`snippet-tag-${i}`}
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
        ) : (
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
  onChange: PropTypes.func
};

export default SnippetsRadioList;
