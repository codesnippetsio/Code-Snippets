import React, { useState, useEffect } from 'react';

//  importing child components
import SnippetDisplay from '../../components/SnippetDisplay/SnippetDisplay.jsx';
import AddSnippet from '../../components/AddSnippet/AddSnippet.jsx';
import SnippetsRadioList from './SnippetsRadioList/SnippetsRadioList.jsx';

//  importing utils
import { Card, Spinner } from 'react-bootstrap';

//  importing styles
import styles from './Sidebar.module.scss';

//  importing assets
import arrow from '../../assets/arrow.png';
import img from '../../assets/star nose mole.jpeg';

const Sidebar = () => {
  const [snippets, setSnippets] = useState([]);
  const [selectedSnippet, setSelectedSnippet] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [loading, setLoading] = useState(true);

  //Get all snippets stored under user's account
  //TODO: Get user ID from global state to include in request
  //FIXME: HARD CODING ID FOR NOW
  const getSnippet = () => {
    setLoading(true);
    fetch(
      '/snippets?' + new URLSearchParams({ _id: '6463eb52ab99bf89a84a3ebd' })
    )
      .then((res) => res.json())
      .then((newSnippetArray) => {
        //As structured in snippets route, should receive an array of snippet objects
        setSnippets(newSnippetArray);
        setLoading(false);
      })
      .catch((error) =>
        console.log('Failed to complete request for snippets: ', error)
      );
  };

  // // renderTags function
  // const renderTabs = () => {
  //   const tabs = [];

  //   for (let i = 0; i < snippets.length; i++) {
  //     tabs.push(<button className={styles.tag}>{snippets[i].title}</button>);
  //   }

  //   return tabs;
  // };

  // wrapper to send to our snippets radio list for updating selected snippet. probably not 100% needed, but want to be able to console log from Sidebar
  const setSelectedSnippetWrapper = (e) => {
    setSelectedSnippet(e);
  };

  const toggleSidebar = () => {
    setCollapse(() => !collapse);
  };

  return (
    <React.Fragment>
      {/*----- SIDE BAR -----*/}
      <Card className={`pt-0 ${styles.sidebar} ${!collapse && styles.open}`}>
        <Card.Header>
          <h1>Code Snippets</h1>

          {/* Changes the collapse state, which will render/unrender the sidebar*/}

          <button className={styles.toggleButton} onClick={toggleSidebar}>
            <img
              className={`${styles.arrow} ${!collapse && styles.arrowOpen}`}
              src={arrow}
              alt="arrow"
            />
          </button>
        </Card.Header>

        {/* Renders the list of snippets fetched from DB */}

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
              snippets={snippets}
              onChange={setSelectedSnippetWrapper}
            />
          </div>
        </Card.Body>

        <h2 className={styles.imgHeader} style={{ display: 'inline-block' }}>
          Click me to add a new snippet!
        </h2>
        <button
          className={styles.addButton}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <img src={img} alt="img" className={styles.img} />
        </button>
      </Card>

      {/*----- ADD SNIPPET MODAL -----*/}

      {openModal && <AddSnippet closeModal={setOpenModal} />}

      {/*----- SNIPPET DISPLAY -----*/}

      <div
        className={`${styles.snippetDisplay} ${
          !collapse && styles.snippetDisplayOpen
        }`}
      >
        {snippets && (
          <SnippetDisplay
            selectedSnippet={selectedSnippet}
            getSnippet={getSnippet}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
