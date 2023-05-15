import React, { useState, useEffect } from 'react';
import SnippetDisplay from '../../components/SnippetDisplay/SnippetDisplay.jsx';
import AddSnippet from '../../components/AddSnippet/AddSnippet.jsx';
import styles from './Sidebar.module.scss';
import SnippetsRadioList from './SnippetsRadioList/SnippetsRadioList.jsx';
import { Card, Spinner } from 'react-bootstrap';
import arrow from '../../assets/arrow.png';

const Sidebar = () => {
  const [snippets, setSnippets] = useState([]);
  const [selectedSnippet, setSelectedSnippet] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [loading, setLoading] = useState(true);

  // getSnippet func
  const getSnippet = () => {
    setLoading(true);
    fetch('http://localhost:3000/snippets')
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);

        // moved setSnippets to outside of for loop so we arent re-rendering each time a snippet is added to state
        const newSnippetArray = [];
        for (const snippet of res) newSnippetArray.push(snippet);

        setSnippets(newSnippetArray);
        setLoading(false);
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
  const setSelectedSnippetWrapper = (e) => {
    setSelectedSnippet(e);
  };

  // get data from backend at first page load
  useEffect(() => getSnippet(), []);

  const toggleSidebar = () => {
    setCollapse(() => !collapse);
  };

  return (
    <>
      <Card className={`pt-0 ${styles.sidebar} ${!collapse && styles.open}`}>
        <Card.Header>
          <h1>Code Snippets</h1>
          <button className={styles.toggleButton} onClick={toggleSidebar}>
            <img
              className={`${styles.arrow} ${!collapse && styles.arrowOpen}`}
              src={arrow}
              alt='arrow'
            />
          </button>
        </Card.Header>

        {/* <div className={styles.logo}></div> */}
        {/* <div className={styles.all_snippets}>
        <button className={styles.tab}>All Snippets</button>
      </div> */}
        <Card.Body className='px-0 pt-0'>
          <div className={styles.cardBody}>
            {/* <p className={styles.title}>Title:</p> */}
            {/* render our snippet list, pass down snippets and function to update selectedSnippet */}
            {loading && (
              <div className='d-flex justify-content-center pt-3'>
                <Spinner
                  animation='border'
                  role='status'
                  variant='primary'
                ></Spinner>
              </div>
            )}
            <SnippetsRadioList
              snippets={snippets}
              onChange={setSelectedSnippetWrapper}
            />
            {/* <div>{renderTabs()}</div> */}
          </div>
        </Card.Body>
        {/* <AddSnippet
        snippets={snippets}
        selectedSnippet={selectedSnippet}
        getSnippet={getSnippet}
        renderTags={renderTabs}
      /> */}

        <button
          className='addButton'
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add a snippet
        </button>
      </Card>
      {openModal && <AddSnippet closeModal={setOpenModal} />}
      <div
        className={`${styles.snippetDisplay} ${
          !collapse && styles.snippetDisplayOpen
        }`}
      >
        {/* {snippets && (
          <SnippetDisplay
            collapse={collapse}
            snippets={snippets}
            selectedSnippet={selectedSnippet}
            getSnippet={getSnippet}
            renderTags={renderTabs}
          />
        )} */}
      </div>
    </>
  );
};

export default Sidebar;
