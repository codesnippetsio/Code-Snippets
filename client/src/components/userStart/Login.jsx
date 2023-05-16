import React, {useState} from 'react';



// eslint-disable-next-line react/prop-types
const Login = ({handleLogin, handleHaveAccount}) => {



  return (
    <div className='login'>
      <div id='loginBox'>
        <h1>USER LOGIN</h1>
        <form action="/action_page.php" className='form'>
          <div className="form-group">
            <label htmlFor="username ">Username:</label>
            <input id='username' className="form-group" type="text"placeholder='username...'/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input id='password' className="form-group" type="password" placeholder='password...'/>
          </div>
          <button onClick={handleLogin} type='submit' className='btn btn-default' id='go'>Go</button>
        </form>
      </div>
      <button onClick={handleHaveAccount} type='submit' className='btn btn-default' > Don't have an account yet? Create yours here!</button>
    </div>
  );
};

export default Login;
