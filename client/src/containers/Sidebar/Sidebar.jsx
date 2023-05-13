import React, {useState, useEffect} from "react";

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

  // set up getSnippet func
    // send get request to server
    // setState with data


    return (
    <div className="sidebar">
    </div>
    );
}

export default Sidebar;