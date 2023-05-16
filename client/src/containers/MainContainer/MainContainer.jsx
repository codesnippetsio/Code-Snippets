import React from 'react';

//  importing  child components
import Sidebar from '../Sidebar/Sidebar.jsx';

//  importing styles
import styles from './MainContainer.module.scss';

const MainContainer = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
};

export default MainContainer;
