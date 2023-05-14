import React, { useEffect } from 'react';
import { TAGS } from '../../../data/data';
import styles from './TagInput.module.scss';
import { WithContext as ReactTags } from 'react-tag-input';
import PropTypes from 'prop-types';

const suggestions = TAGS.map((tag) => {
  return {
    id: tag,
    text: tag,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagInput = (props) => {
  const initialTags = props.tags ? props.tags : [];
  const [tags, setTags] = React.useState(initialTags);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  useEffect(() => {
    if (props.onChange) props.onChange(tags);
  }, [tags]);

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition='bottom'
        autocomplete
      />
    </div>
  );
};

TagInput.propTypes = {
  onChange: PropTypes.func,
  tags: PropTypes.array
};

export default TagInput;
