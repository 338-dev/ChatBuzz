import React, {/*useState*/} from 'react';
import './App.css';

import Sidebar from "./components/Sidebar/Sidebar.component"
import {/*Select*/} from 'react-select' ;
import Search from "./components/Search/Search.component";
import Messages from './components/Messages/Messages.component';

export var test = false;

function App() {
  
  
 
return (
<>  
  <div><Sidebar/></div>
  <div  className="main" >
    {/* <div><Search/></div> */}
    <Messages/>
    
    
  </div>
 
</>);  
}

export default App;