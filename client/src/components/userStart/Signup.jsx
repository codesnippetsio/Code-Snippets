import React, {useState} from 'react';

// eslint-disable-next-line react/prop-types
const Signup = ({handleSigned}) => {
  return (
    <form action="/action_page.php" className='signup'>
      <h2>Create Your Account Here</h2>
      <div className="form-group">
        <label htmlFor="user">Username: </label>
        <input type="text" className="form-control" id="user" />
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Password:</label>
        <input type="password" className="form-control" id="pwd" />
      </div> 
      <button id='submit' onClick={handleSigned} type="submit" className="btn btn-default">Submit</button>
    </form>
   
  );
};

export default Signup;
