import React from "react"
import firebase from "../../../server/firebase";
import "./Username.css";
import BasicModal from './BasicModal.component';
import { useNavigate } from "react-router-dom";
//import avatar from './avatar.png';

const Username=(props)=>{
   
    var db=firebase.firestore();
    var auth=firebase.auth();
    //const [image , setImage] = useState('');
    //const [url, setUrl]=useState(avatar);
    const user = firebase.auth().currentUser;
    if (user) {
        
        const usersRef = db.collection('email').doc(auth.currentUser.email)
 
        usersRef.get()
        .then((docSnapshot) => {
         if (docSnapshot.exists) {
           navigate("/");
          } 
 });
}
 //console.log      
     const navigate = useNavigate();
     const saveUserInDB = (createdUser) => {
        const usersRef = db.collection('email').doc(user.email)
        var val=document.getElementById("input").value;
        if(val===""||val===null)
        {
            alert("Username can't be empty")
            return;
        }  
       
        const userdp = db.collection('username').doc(val)
        
        console.log(val)
        usersRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
            usersRef.onSnapshot((doc) => {
                alert("error") 
            });
            } 
            else{ 
                userdp.get()
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                    userdp.onSnapshot((doc) => {
                        alert("Username already exist, try something else");
                    });
                    }
                    else{
                        var imglink;
                        
                            firebase.storage().ref(`/images/${auth.currentUser.email}`).getDownloadURL().then(onResolve, onReject);
                            function onResolve(imgUrl){
                                
                                imglink=imgUrl;
                                console.log(imglink)
                                db.collection("username").doc(val).set({
                                    displayName: auth.currentUser.displayName,
                                    email: auth.currentUser.email,
                                    imgUrl:imglink
                                })
                                .then(() => {
                                    db.collection("email").doc(user.email)
                                .set(
                                    {
                                        "username":val,
                                        displayName: auth.currentUser.displayName,
                                        "imgUrl":imglink
                                    }
                                )
                                .then(()=>{
                                    navigate("/");
                                })
                                   
                                    console.log("Document successfully written!");
                                    
                                })
                                .catch(serverError => {
                                   
                                })
                                
                            }
                            function onReject(error) {
                                console.log(error.code);
                                console.log(error);
                                
                                    imglink='https://firebasestorage.googleapis.com/v0/b/slack-like-app-e6230.appspot.com/o/images%2FuserImage.png?alt=media&token=113253f0-8c15-40e9-b74b-053fd82e0415';
                                   console.log(imglink);
                                   db.collection("username").doc(val).set({
                                    displayName: auth.currentUser.displayName,
                                    email: auth.currentUser.email,
                                    imgUrl:imglink
                                })
                                .then(() => {
                                    db.collection("email").doc(user.email)
                                .set(
                                    {
                                        "username":val,
                                        displayName: auth.currentUser.displayName,
                                        "imgUrl":'https://firebasestorage.googleapis.com/v0/b/slack-like-app-e6230.appspot.com/o/images%2FuserImage.png?alt=media&token=113253f0-8c15-40e9-b74b-053fd82e0415'
                                    }
                                )
                                .then(()=>{
                                    navigate("/");
                                })
                                   
                                    console.log("Document successfully written!");
                                    
                                })
                                .catch(serverError => {
                                   
                                })
                                console.log("image uploaded")
                            }
                            
                        
                        //console.log(imglink);
                        // db.collection("username").doc(val).set({
                        //     displayName: auth.currentUser.displayName,
                        //     email: auth.currentUser.email,
                        //     imgUrl:imglink
                        // })
                        // .then(() => {
                        //     db.collection("email").doc(user.email)
                        // .set(
                        //     {
                        //         "username":val,
                        //         displayName: auth.currentUser.displayName,
                        //         "imgUrl":imglink
                        //     }
                        // )
                        // .then(()=>{
                        //     navigate("/");
                        // })
                           
                        //     console.log("Document successfully written!");
                            
                        // })
                        // .catch(serverError => {
                           
                        // })

                    } 
                });
                
            }
            
       });
     }
const signOut=()=>{
    firebase.auth().signOut();
}


// const choosefile=(e)=>{
//     let file={};
//     file=e.target.files[0];
//     firebase.storage().ref('users/'+auth.user.uid+'/profile.jpg').put(file).then(()=>{
//         console.log('successful');
//     })
//     .catch(error=>{
//         console.log(error);
//     })
// }

    const css = `
  body {
      background-color: rgb(235, 240, 231);
  }
  `

    return(
    <>
    
        <style>{css}</style>
        
        <div className="maindiv">
            
            <div className="internalDiv">
            <h1 className="welcome">Welcome<span><h1 className="username">{user?user.displayName:"user"}</h1></span> 
            </h1>

            
            <h4 className="welcome">Choose a Username</h4><br /><br />
          
            <center>
            {/* <div className="image-upload">
            <label for="file-input">
                <img src={url} alt="userImg" width={"100px"} style={{"borderRadius":"50%", "height":"100px","objectFit":"cover"}}/>
            </label>

            <input id="file-input" type="file" onChange={(e)=>{setImage(e.target.files[0]); setUrl(image)}} />
            </div> */}

           
            <BasicModal/>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
                @
            </span>
            </div>
            <input type="text" className="form-control" id="input"placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" /><button className="btn btn-primary" onClick={saveUserInDB}>Submit</button> 
            </div>
            </center>
             <center><br />
      <a href="#input" onClick={signOut}>back to SignIn</a></center>
            </div>
           
        </div>
        
    </>
    )

}
export default Username;