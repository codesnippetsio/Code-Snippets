import React, { useState} from 'react';
import TagInfoItem from './TagInfoItem/TagInfoItem.jsx';
import SnippetDisplay from '../../components/SnippetDisplay/SnippetDisplay.jsx';
import styles from './TagInfoDisplay.module.scss';

const TagInfoDisplay = ({snippets, selectedTag, selectedLanguage}) => {
  const [openTab, setOpenTab] = useState(false);

  const renderTagLists = () => {
    const newTagList = [];

    for (const snippet of snippets){
      if (snippet.tags.includes(selectedTag))
        newTagList.push(snippet);
    }

    return newTagList;
  };


  const tags = [];

  for (const tag of selectedTag){
    tags.push(<TagInfoItem renderTagLists={renderTagLists} />);
  }

  return (
    <div>
      {openTab && tags}
    </div>
  );

}

export default TagInfoDisplay;