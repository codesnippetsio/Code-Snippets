import React, { useState } from 'react';
import styles from './Welcome.scss';
import Signup from '../components/Signup'

const Welcome = ({ setLoggedIn }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    console.log(username);
    console.log(password);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((user) => {
        console.log('hello');
        console.log('You loggedin', user);
        setLoggedIn('fake data');
      })
      .catch((err) =>
        console.log('error from Login-Post-Request ERROR: ', err)
      );
  };

  const signupDisplay = () => {
    console.log('you clicked signup');
    setModalVisible(true);
  };

  const inputChange = () => {
    console.log('its changing');
  };

  return (
    <div className='welcome'>
      <h1>Code Snippets</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username </label>
          <input
            type='text'
            name='username'
            className='login__input'
            // onChange={inputChange}
            required
            autoComplete='off'
          />
        </div>
        <div className='input-container'>
          <label>Password </label>
          <input
            type='password'
            name='pword'
            className='login__input'
            // onChange={inputChange}
            required
            autoComplete='off'
          />
        </div>
        <button type='submit' className='btn btn--popup'>
          Login
        </button>
      </form>
      <h2>
        Not a member?{' '}
        <a className='signup' onClick={signupDisplay}>
          Sign up
        </a>
      </h2>
      {modalVisible && <Signup setModalVisible={setModalVisible}/>}
    </div>
  );
};

export default Welcome;
