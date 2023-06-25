import React, { useState, useEffect } from 'react';
import './TagInput.scss';

//  importing utils
import { WithContext as ReactTags } from 'react-tag-input';
import PropTypes from 'prop-types';

//  importing data
import { TAGS } from '../../../data/data';

//  importing styles

const suggestions = TAGS.map((tag) => {
  return {
    id: tag,
    text: tag
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagInput = ({ onChange, defaultTags, readOnly }) => {
  const [tags, setTags] = useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    console.log('Added tag:');
    console.dir(tag);
    const newTags = tags.map((el) => el);
    newTags.push(tag);
    setTags(newTags);
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
    if (defaultTags) {
      const tagArr = [];
      defaultTags.forEach((tag) => {
        tagArr.push({ id: tag, text: tag });
      });
      setTags(tagArr);
    }
  }, [defaultTags]);

  useEffect(() => {
    const tagStringList = [];
    if (onChange) {
      tags.forEach((tag) => tagStringList.push(tag.text));
      onChange(tagStringList);
    }
  }, [tags]);

  return (
    <ReactTags
      readOnly={readOnly}
      inline={false}
      inputFieldPosition="bottom"
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
  defaultTags: PropTypes.array
};

export default TagInput;
