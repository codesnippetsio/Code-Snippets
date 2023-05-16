import React, { useState, useEffect } from 'react';

//  importing utils
import { WithContext as ReactTags } from 'react-tag-input';
import PropTypes from 'prop-types';

//  importing data
import { TAGS } from '../../../data/data';

//  importing styles

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
  const [tags, setTags] = useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const initialTags = () => {
    const newTagList = [];
    if (props.tags) {
      props.tags.forEach((tag) => newTagList.push({ id: tag, text: tag }));
      setTags(newTagList);
    }
  };

  // useEffect(() => {
  //   console.log('hello');
  //   initialTags();
  // }, [tags]);

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
    const tagStringList = [];
    if (props.onChange) {
      tags.forEach((tag) => tagStringList.push(tag.text));
      props.onChange(tagStringList);
    }
  }, [tags]);

  return (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      handleTagClick={handleTagClick}
      // inputFieldPosition='inline'
      autocomplete
    />
  );
};

TagInput.propTypes = {
  onChange: PropTypes.func,
  tags: PropTypes.array,
};

export default TagInput;
