import React, { useState} from 'react';
import styles from './TagInfoItem.module.scss';

const TagInfoItem = ({renderTagLists}) => {
  return (
    <button onClick={renderTagLists()}></button>
  )
};

export default TagInfoItem;
