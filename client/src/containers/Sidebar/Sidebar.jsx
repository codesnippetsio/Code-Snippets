import React, {useState, useEffect} from "react";
import SnippetDisplay from '../../components/SnippetDisplay/SnippetDisplay.jsx';
import AddSnippet from '../../components/AddSnippet/AddSnippet.jsx';

const Sidebar = () => {
  const [state, setState] = useState({
    snippets: [],
    selectedSnippet: {
      id: '',
      title: '',
      comments: '',
      storedCode: '',
      tags: [],
      language: ''
    },
  });

  // /snippets?id=${_id}
  // set up getSnippet func
    // send get request to server
    // setState with data * deal with CORS warning - cors module & webpack config?
  const getSnippet = () => {
    fetch('http://localhost:3000/snippets',{mode: 'no-cors'})
    .then(res => res) // change back to res.json() *currently encountring error
    .then(res => {
      console.log(res);
    })
    .catch( error => console.log('Get request failed', error))
  }

  // do get request after each post request

  useEffect(() => getSnippet(), []); // [] to be updated

  // addTag
  const addTag = () => {

  }

    return (
    <div className="sidebar">
      <div className="logo"></div>
      <div className="all_snippets">
        <button className="all_snippets_btn">All Snippets</button>
      </div>
      <div className="tags">
        <p className="tag_name">Tag Name:</p>
      </div>
      <SnippetDisplay />
      <AddSnippet />
    </div>
    );
}

export default Sidebar;