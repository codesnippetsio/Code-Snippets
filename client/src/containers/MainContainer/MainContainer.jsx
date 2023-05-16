import React, {useState} from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import styles from './MainContainer.module.scss';
import Login from '../../components/userStart/Login.jsx';
import Signup from '../../components/userStart/Signup.jsx';

const MainContainer = () =>{

  const [login, setLogin] = useState(false);
  const [haveAccount,setHaveAccount] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const usernameInputValue = document.getElementById('username').value;
    document.getElementById('username').value = '';
    const passwordInputValue = document.getElementById('password').value;
    document.getElementById('password').value = '';

    // fetch(URLtoGetUser, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: usernameInputValue,
    //     password: passwordInputValue,
    //   }),
    // })
    //   .then((result) => result.json())
    //   .then((result) => {
    //     console.log('result is: ', result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    setLogin(true);
  };

  const handleHaveAccount = () => setHaveAccount(false);
  const handleSigned = () => setHaveAccount(true);
  

  return login ? 
    (
      <div className={styles.container}>
        <Sidebar />
      </div>
    ) : haveAccount ?  (
      <div className={styles.container}>
        <Login handleLogin={handleLogin} handleHaveAccount={handleHaveAccount}/>
      </div>
    ) : (
      <div className={styles.container}>
        <Signup handleSigned={handleSigned} /> 
      </div>
    );
};

export default MainContainer;