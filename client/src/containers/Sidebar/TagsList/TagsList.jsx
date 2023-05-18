import React, { useEffect } from 'react';

//  importing utils
import PropTypes from 'prop-types';

//  importing styles
import styles from './TagsList.module.scss';

function TagsList({ allTags, selectedTags, selectDeselectTag }) {
  const buttonList = [];

  const onTagClick = (e) => {
    selectDeselectTag(e.target.value);
  };

  if (allTags) {
    allTags.forEach((el) => {
      const currButton = (
        <button
          value={el}
          key={`tag-${el}`}
          onClick={onTagClick}
          className={
            selectedTags.includes(el) ? styles.activeTag : styles.inactiveTag
          }
        >
          {el}
        </button>
      );
      buttonList.push(currButton);
    });
  }

  return <div className={styles.tagsListDisplay}>{buttonList}</div>;
}
TagsList.propTypes = {
  allTags: PropTypes.array,
  selectedTags: PropTypes.array,
  selectDeselectTag: PropTypes.func
};
export default TagsList;
