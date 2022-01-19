import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from './server/firebase';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
//import {Redirect} from 'react-router';
import { useNavigate } from "react-router-dom";
import Login from "./components/auth/Login/Login.component"
import Register from './components/auth/Register/Register.component';
import Username from './components/auth/Username/Username.component';

//import "semantic-ui-react/semantic.min.css"
const Index = () => {
  var auth=firebase.auth();
  var db=firebase.firestore();
  
  const navigate = useNavigate();

   useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
       const usersRef = db.collection('email').doc(auth.currentUser.email)

       usersRef.get()
       .then((docSnapshot) => {
        if (docSnapshot.exists) {
          navigate("/");
         } 
         else {
          navigate("/username");
         }
    });
   //navigate("/");
        
      } else {
        
        navigate("/login");
      }
    })
    //eslint-disable-next-line
   }, []);


  return (
    
      <Routes>
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>} />
         <Route path='/' element={<App/>} />
         <Route path="/username" element={<Username/>} />
      </Routes>
  )
}
ReactDOM.render(
 
  <React.StrictMode>
    <Router>
    <Index/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();