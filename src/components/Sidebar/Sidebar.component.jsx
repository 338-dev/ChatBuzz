import React, {useState, useEffect} from 'react';
import './sidebar.css';
import logo from './logo.png';
import avatar from './avatar.png'
import firebase from '../../server/firebase';
import { useNavigate } from 'react-router';
import { Dropdown } from 'react-bootstrap';
import userImage from './userImage.png';
//import Ultrasidebar from './Ultrasidebar.component';
import Profilephoto from './Profilephoto.component';

const Sidebaar=()=>{
  //const auth=firebase.auth();
  const user=firebase.auth().currentUser;
  var db=firebase.firestore();
  const navigate = useNavigate();
  
  const logout=()=>{
    firebase.auth().signOut();
    navigate('/login');
  }
  
  var email; 
  var [friends, setFriends]=useState([]);
  const [url, setUrl]=useState(avatar)
    
  try {
    document.getElementById("dropdown-basic").innerText=user.displayName;
    email=user.email;
   // console.log(email)
  } catch (error) {
    
  }
  db.collection('email').doc(email).get()
  .then((doc)=>{
    setUrl(doc.get('imgUrl'));
  })



  useEffect(() => {
    //console.log("imin"+email);
  db.collection("email").doc(email).collection("friends")
  .onSnapshot((querySnapshot) =>{
    var cities = [];
    querySnapshot.forEach((doc) =>{
      var a=[]
      a.push(doc.id);
      a.push(doc.data().imgUrl)
      cities.push(a)
      // console.log(a)
      // console.log(cities);
    })
    setFriends(cities);
  })
 // var up;
//   var reference=db.collection("email").doc(email)
// reference.get().then((doc)=>{
//                   up=doc.get('username');
//                   alert(up);
//                 })
//                 var ig;
//                 db.collection('email').doc(email).get()
  // .then((doc)=>{
  //   ig=doc.get('imgUrl');
  // })
  // var abcd=db.collection("username").doc(up)
  //               abcd.update({
  //                 "imgUrl":ig
  //               })
  //               .then(() => {
  //                 alert("username");
  //                 alert(up);
  //               })
  //               .catch(serverError => {
  //                 alert(serverError);
  //               })
  // console.log(friends)
   //eslint-disable-next-line
}, [url])

const set=(value)=>{
  db.collection("email").doc(email).update({
    "open":value[0],
    "openImg":value[1]
  })
  .then(()=>{
    console.log("yes")
  }); 

}
const [showText, setShowText] = useState(false);
const onClick = () => setShowText(true);
  const css = `
  body {
      color: white;
  }
  `
      return(
      <>
      <div>
      <div className="sidenav">
      <style>{css}</style>
      <h3 style={{"marginTop":"-20px","marginLeft":"-20px"}}>   
        <span>
          <img src={logo} alt="slack-logo" width="99px" style={{"marginRight":"-10px","marginLeft":"15px"}} />
        </span>
        ChatBuzz 
      </h3>
      
      
      <h6>
        <Dropdown>
          <span>
          <img src={url} alt="userImg" width={"100px"} style={{"borderRadius":"50%", "height":"100px","objectFit":"cover"}} />
          {/* <Profilephoto style={{"marginLeft":"100px"}}/> */}
          </span>
          <Dropdown.Toggle variant="success" id="dropdown-basic">user
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Notifications</Dropdown.Item>
            <Dropdown.Item onClick={logout}>logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </h6>
      <h4 style={{"color":"silver","fontWeight":"100","marginLeft":"10px"}}>your chats appears here</h4>
      {friends.map((value, key) => {
            return (
              <div className="chatbut">
                <button className="btn btn-secondary"
                onClick={()=>{set(value);}} >
                <span>
                  <img src={value[1]} alt="" width={"50px"} style={{"borderRadius":"50%", "height":"50px","objectFit":"cover"}}/>
                </span>
                {value[0]}      
              </button><br />
              </div>
            );
          })}
          {/* <div>{email}</div> */}
          
          
     </div>
     {/* <div>
      <button onClick={onClick}>Click me</button>
      {showText ? <Ultrasidebar /> : null}
   </div> */}
    </div>
    </>
      )
      

  }
  export default Sidebaar;