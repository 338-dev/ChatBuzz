import React, { useState } from "react";
import "./Search.css";
import firebase from "firebase/compat";
import SearchBar from "material-ui-search-bar";
import Sidebar from "../Sidebar/Sidebar.component"

function Search() {

  var db=firebase.firestore();
  var auth=firebase.auth();

  var arr=[];
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = () => {
    const searchWord = document.getElementById("searching").value;
    setWordEntered(searchWord);

    firebase.firestore().collection('email').orderBy('username').startAt(wordEntered).endAt(wordEntered + '\uf8ff')
    .get()
      .then((querySnapshot) => {
        arr=[]
          querySnapshot.forEach((doc) => {
            
            arr.push(doc.data())
           
          });
          
          if (searchWord === "") {
            setFilteredData([]);
          } 
          else {
            setFilteredData(arr);
          }
      })
         
  };

  const friend=(a)=>{

    db.collection('username').doc(a).get().then((doc)=>{
      if (doc.exists) {
        db.collection('email').doc(auth.currentUser.email).collection('friends').doc(a).set({
          "email":doc.data().email,
          "displayName":doc.data().displayName,
          "imgUrl":doc.data().imgUrl
        })
        .then(()=>{
          console.log(doc.data().email+doc.data().displayName+doc.data().imgUrl)
          setFilteredData([])
          db.collection('email').doc(auth.currentUser.email).get().then((docabc)=>{
            db.collection('email').doc(doc.get("email")).collection('friends').doc(docabc.get("username")).set({
              "setted":"sett",
              "imgUrl":docabc.get("imgUrl"),
              "displayName":docabc.get("displayName"),
              "email":auth.currentUser.email
            })
            .then(()=>{
              console.log("email and username"+doc.get("email")+
              docabc.get("username"))
              db.collection("email").doc(auth.currentUser.email).collection('friends').doc(a).collection('messages').doc("1")
              .set({
                
              });
            })

          })
          


        
          console.log("added"+a);
        })
      
    }
     
    }
  )
    console.log(a)
 
  }
  

  return (<>
  <Sidebar/>
  <div style={{"marginLeft":"35%","marginRight":"30%","backgroundColor":"grey"}}>
  
    <div className="searchPart">
    
      <SearchBar 
      value={wordEntered}
      onChange={handleFilter}
      onCancelSearch={()=>setFilteredData([])}
      id="searching"/>
      {filteredData.length !== 0 && (<div>
       
        <div className="dataResult">
          
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <button className="dataItem btn" id="btm" onClick={()=>{friend(value.username);}}>

                <div><p><span><img src={value.imgUrl} alt="" width={"50px"} style={{"borderRadius":"50%", "height":"50px","objectFit":"cover"}} /></span>@{value.username}<span><br/><small style={{"marginLeft":"50px","marginTop":"-25px"}}>{value.displayName}</small></span></p>
                
                </div>
                
              </button>
            );
          })}
          <span></span>
        </div></div>
      )}
     
       
    </div>
  </div>
   
    </>
  );
}

export default Search;