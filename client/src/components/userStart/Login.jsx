import React, {useState} from 'react';



// eslint-disable-next-line react/prop-types
const Login = ({handleLogin, handleHaveAccount}) => {



  return (
    <div className='login'>
      <div id='loginBox'>
        <h1>USER LOGIN</h1>
        <form action="/action_page.php" className='form'>
          <div className="form-group">
            <label htmlFor="username ">USERNAME:</label>&nbsp; &nbsp;
            <input id='username' className="form-group" type="text"placeholder='username...'/>
          </div>
          <div className="form-group" id='secondDiv'>
            <label htmlFor="password">PASSWORD:</label>&nbsp; &nbsp;
            <input id='password' className="form-group" type="password" placeholder='password...'/>
          </div>
          <button onClick={handleLogin} type='submit' className='btn btn-default' id='go'>GO</button>
        </form>
      </div>
      <button id="bottomMessage" onClick={handleHaveAccount} type='submit' className='btn btn-default' >Click Me to Create Your Account!</button>
    </div>
  );
};

export default Login;
