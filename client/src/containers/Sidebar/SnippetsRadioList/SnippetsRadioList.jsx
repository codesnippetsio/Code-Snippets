import PropTypes from 'prop-types';
import styles from './SnippetsRadioList.module.scss';
import { Fragment } from 'react';

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
      const currButton =
        i === 0 ? (
          <Fragment key={i}>
            <input
              name='snippetList'
              type='radio'
              id={`snippet-input-${i}`}
              value={el.id}
              defaultChecked
              key={`snippet-tag-${i}`}
            />
            <label htmlFor={`snippet-input-${i}`} key={`snippet-label-${i}`}>
              {el.title}
            </label>
          </Fragment>
        ) : (
          <Fragment key={i}>
            <input
              name='snippetList'
              type='radio'
              id={`snippet-input-${i}`}
              value={el.id}
              key={i}
            />
            <label htmlFor={`snippet-input-${i}`} key={`snippet-label-${i}`}>
              {el.title}
            </label>
          </Fragment>
        );

      toggleButtons.push(currButton);
    });
  }

  return (
    <>
      <div
        className={`${styles.snippetGroup}`}
        onChange={(e) => onChangeValue(e)}
      >
        {toggleButtons}
      </div>
    </>
  );
}

SnippetsRadioList.propTypes = {
  snippets: PropTypes.array,
  onChange: PropTypes.func,
};

export default SnippetsRadioList;
