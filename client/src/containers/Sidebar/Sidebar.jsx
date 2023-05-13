import React, {useState, useEffect} from "react";
import SnippetDisplay from '../../components/SnippetDisplay/SnippetDisplay.jsx';
import AddSnippet from '../../components/AddSnippet/AddSnippet.jsx';
import styles from './Sidebar.module.scss'

const Sidebar = () => {
  const [snippets, setSnippets] = useState([]);
  const [selectedSnippet, setSelectedSnippet] = useState({});

  // getSnippet func
  const getSnippet = () => {
    fetch('http://localhost:3000/snippets', {mode: 'no-cors'})
    .then(res => res.json())
    .then(res => {
      console.log('res', res);

      for (const snippet of res){
        setSnippets(prev => prev.push(snippet));
        setSelectedSnippet({
          id: snippet._id,
          title: snippet.title,
          comments: snippet.comments,
          storedCode: snippet.storedCode,
          tags: snippet.tags,
          language: snippet.language
        })
      }

    })
    .catch( error => console.log('Get request failed', error))
  }

  // renderTags function
  const renderTabs = () => {
    const tabs = [];

    for(let i = 0; i < snippets.length; i++){
      tabs.push(<button className={styles.tab}>{snippets[i].title}</button>)
    }

    return tabs;
  }

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
        <div>
          {renderTabs()}
        </div>
      </div>
         <div>
          {snippets && <SnippetDisplay snippets={snippets} selectedSnippet={selectedSnippet} getSnippet={getSnippet} renderTags={renderTabs}/>
          }
         </div>
        <AddSnippet snippets={snippets} selectedSnippet={selectedSnippet} getSnippet={getSnippet} renderTags={renderTabs}/>
    </div>
    );
}

export default Sidebar;