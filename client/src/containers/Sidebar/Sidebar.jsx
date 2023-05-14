import React, { useState, useEffect } from 'react';
import SnippetDisplay from '../../components/SnippetDisplay/SnippetDisplay.jsx';
import AddSnippet from '../../components/AddSnippet/AddSnippet.jsx';
import styles from './Sidebar.module.scss';
import SnippetsRadioList from './SnippetsRadioList/SnippetsRadioList.jsx';

const Sidebar = () => {
  const [snippets, setSnippets] = useState([]);
  const [selectedSnippet, setSelectedSnippet] = useState({});

  // getSnippet func
  const getSnippet = () => {
    fetch('http://localhost:3000/snippets')
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);

        // moved setSnippets to outside of for loop so we arent re-rendering each time a snippet is added to state
        const newSnippetArray = [];
        for (const snippet of res) newSnippetArray.push(snippet);

        setSnippets(newSnippetArray);
      })
      .catch((error) => console.log('Get request failed', error));
  };

  // renderTags function
  const renderTabs = () => {
    const tabs = [];

    for (let i = 0; i < snippets.length; i++) {
      tabs.push(<button className={styles.tab}>{snippets[i].title}</button>);
    }

    return tabs;
  };

  // wrapper to send to our snippets radio list for updating selected snippet. probably not 100% needed, but want to be able to console log from Sidebar
  const setSelectedSnippetWrapper = e => {
    setSelectedSnippet(e);
  };

  // get data from backend at first page load
  useEffect(() => getSnippet(), []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}></div>
      <div className={styles.all_snippets}>
        <button className={styles.tab}>All Snippets</button>
      </div>
      <div className={styles.tabs_display}>
        <p className={styles.title}>Title:</p>
        {/* render our snippet list, pass down snippets and function to update selectedSnippet */}
        <SnippetsRadioList snippets={snippets} onChange={setSelectedSnippetWrapper}/>
        {/* <div>{renderTabs()}</div> */}
      </div>
      <div>
        {snippets && (
          <SnippetDisplay
            snippets={snippets}
            selectedSnippet={selectedSnippet}
            getSnippet={getSnippet}
            renderTags={renderTabs}
          />
        )}
      </div>
      <AddSnippet
        snippets={snippets}
        selectedSnippet={selectedSnippet}
        getSnippet={getSnippet}
        renderTags={renderTabs}
      />
    </div>
  );
};

export default Sidebar;
