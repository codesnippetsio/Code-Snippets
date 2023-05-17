import React, {useState} from 'react';

// eslint-disable-next-line react/prop-types
const Signup = ({handleSigned}) => {
  return (
    <form action="/action_page.php" className='signup'>
      <h2>Create Your Account</h2>
      <div className="form-group input">
        <label htmlFor="user">Username:</label>
        <input type="text" className="form-control" id="user" />
      </div>
      <div className="form-group input" id="secondInput">
        <label htmlFor="pwd">Password:</label>
        <input type="password" className="form-control" id="psw" />
      </div> 
      <button id='submit' onClick={handleSigned} type="submit" className="btn btn-default">Submit</button>
    </form>
   
  );
};

export default Signup;
