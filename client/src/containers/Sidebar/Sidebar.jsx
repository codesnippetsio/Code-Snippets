import React, { useState, useEffect } from 'react';

//  importing child components
import SnippetDisplay from '../../components/SnippetDisplay/SnippetDisplay.jsx';
import AddSnippet from '../../components/AddSnippet/AddSnippet.jsx';
import SnippetsRadioList from './SnippetsRadioList/SnippetsRadioList.jsx';
import TagsList from './TagsList/TagsList.jsx';

//  importing utils
import { Card, Spinner } from 'react-bootstrap';

//  importing styles
import styles from './Sidebar.module.scss';

//  importing assets
import arrow from '../../assets/arrow.png';
import img from '../../assets/star nose mole.jpeg';

const Sidebar = ({ handleLogin }) => {
  //Snippets and selected snippet
  const [snippets, setSnippets] = useState([]);
  const [selectedSnippet, setSelectedSnippet] = useState({});

  //Tags and selected tags
  const [userTags, setUserTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayType, setDisplayType] = useState('snippets');

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    filterSnippetsByTags();
  }, [snippets, selectedTags]);
  //Get all snippets stored under user's account

  const getUserData = () => {
    setLoading(true);
    fetch('/snippets')
      .then((res) => res.json())
      .then((data) => {
        //As structured in snippets route, should receive an array of snippet objects
        setSnippets(data.snippets);
        setUserTags([...data.tagsLangs.tags, ...data.tagsLangs.languages]);
        setLoading(false);
      })
      .catch((error) =>
        console.log('Failed to complete request for snippets: ', error)
      );
  };

  // wrapper to send to our snippets radio list for updating selected snippet. probably not 100% needed, but want to be able to console log from Sidebar
  const setSelectedSnippetWrapper = (e) => {
    setSelectedSnippet(e);
  };

  const selectDeselectTag = (tagValue) => {
    const newTagList = new Set(selectedTags);
    if (!newTagList.has(tagValue)) {
      newTagList.add(tagValue);
    } else {
      newTagList.delete(tagValue);
    }

    setSelectedTags(Array.from(newTagList));
  };

  const toggleSidebar = () => {
    setCollapse(() => !collapse);
  };

  const toggleDisplayType = (event) => {
    setDisplayType(event.target.value);
  };

  const filterSnippetsByTags = () => {
    const snippetSubset = snippets.filter((sn) => {
      for (let i = 0; i < [...sn.tags, sn.lanuage].length; i++) {
        if (selectedTags.includes([...sn.tags, sn.lanuage][i])) return true;
      }
      return false;
    });

    setFilteredSnippets(snippetSubset);
  };

  const snippetsDisplay = (
    <Card.Body className="px-0 pt-0">
      {/* Animation while app is fetching data from DB */}
      <div className={styles.cardBody}>
        {loading && (
          <div className="d-flex justify-content-center pt-3">
            <Spinner
              animation="border"
              role="status"
              variant="primary"
            ></Spinner>
          </div>
        )}
        <SnippetsRadioList
          listType="fullList"
          snippets={snippets}
          setSelectedSnippet={setSelectedSnippetWrapper}
        />
      </div>
    </Card.Body>
  );

  const tagsDisplay = (
    <Card.Body className="px-0 pt-0">
      {/* Animation while app is fetching data from DB */}
      <div className={styles.cardBody}>
        {loading && (
          <div className="d-flex justify-content-center pt-3">
            <Spinner
              animation="border"
              role="status"
              variant="primary"
            ></Spinner>
          </div>
        )}
        <TagsList
          allTags={userTags}
          selectedTags={selectedTags}
          selectDeselectTag={selectDeselectTag}
        />
        <SnippetsRadioList
          listType="filteredList"
          snippets={filteredSnippets}
          setSelectedSnippet={setSelectedSnippetWrapper}
        />
      </div>
    </Card.Body>
  );

  return (
    <React.Fragment>
      {/*----- SIDE BAR -----*/}
      <Card
        id="card"
        className={`pt-0 ${styles.sidebar} ${!collapse && styles.open}`}
      >
        <Card.Header>
          {/* Changes the collapse state, which will render/unrender the sidebar*/}
          <div className={styles.displayTypeSelector}>
            <button
              value="snippets"
              className={
                displayType === 'snippets'
                  ? styles.displayTypeButtonActive
                  : styles.displayTypeButtonInactive
              }
              onClick={toggleDisplayType}
            >
              Snippets
            </button>
            <button
              value="tags"
              className={
                displayType === 'tags'
                  ? styles.displayTypeButtonActive
                  : styles.displayTypeButtonInactive
              }
              onClick={toggleDisplayType}
            >
              Tags
            </button>
          </div>
          <button className={styles.toggleButton} onClick={toggleSidebar}>
            <img
              className={`${styles.arrow} ${!collapse && styles.arrowOpen}`}
              src={arrow}
              alt="arrow"
            />
          </button>
        </Card.Header>

        {/* Renders the list of snippets fetched from DB */}

        {displayType === 'snippets' ? snippetsDisplay : tagsDisplay}

        <button
          className={styles.addButton}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add New Snippet
        </button>
      </Card>

      {/*----- ADD SNIPPET MODAL -----*/}

      {openModal && (
        <AddSnippet closeModal={setOpenModal} getUserData={getUserData} />
      )}

      {/*----- SNIPPET DISPLAY -----*/}

      <div
        className={`${styles.snippetDisplay} ${
          !collapse && styles.snippetDisplayOpen
        }`}
      >
        {snippets && (
          <SnippetDisplay
            selectedSnippet={selectedSnippet}
            getSnippet={getUserData}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
