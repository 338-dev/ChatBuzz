import React, { useEffect, useState, useRef } from "react";
import firebase from '../../server/firebase';
//import message from'./message.png'
import './Messages.css';
import userImage from './userImage.png';

const Messages=()=>{
    const [title, setTitle] = useState();
    const user=firebase.auth().currentUser;
    const [currentname, setCurrentname]=useState('');
    const [img,setImg]=useState(userImage);
    var email; 
    var db=firebase.firestore();
    var [messages, setMessages]=useState([]);
   // var arr=[];
   const messagesEndRef=useRef(null);

    try 
    {
        email=user.email;
    } 
    catch (error) 
    {
        
    }
     var useref=db.collection("email").doc(email);

   
    var name,image;
    useEffect(() => {
        //handleBackClick();
        setMessages([]);
        useref
        .onSnapshot((doc) => {
            //console.log("Current data: ", doc.data());
            name=doc.get('open');
            image=doc.get('openImg');
            setCurrentname(name);
            setImg(image)
            //console.log(name)
            useref.collection('friends').doc(name).collection('messages').orderBy("sent", "asc")
            .onSnapshot((querySnapshot) =>
            {
                var cities = [];
                querySnapshot.forEach((doc) => {
                    var a=[];
                    a.push(doc.data().message);
                    
                    const date=doc.get('sent');
                    try {
                        if(date!=='' || date!==null){
                        
                            const dat=date.toDate().toLocaleTimeString();
                            a.push(dat);
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    
                    a.push(doc.data().by);
                   // console.log(a);
                    cities.push(a);
                    //console.log(cities);
                });
                setMessages(cities);
                //console.log(cities)
            });
               
            //console.log("how")
           // console.log(messages+"mess")
            setMessages([]);
            
        });
        //eslint-disable-next-line
    }, [email])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
       
    }, [messages])

    //console.log(title);
    
    const inp=(t)=>{
        
            console.log("dont do this");
            var currentusername;
            useref.get().then(doc=>{
                currentusername=doc.data().username;
            })
           
            var p;
       
                
            p=document.getElementById("exampleInputEmail1").value;
            setTitle("");
            
            useref
            .get().then((doc) => {
                if (doc.exists) {
                    console.log("how is it here");
                    console.log(p);
                    var name;
                    name=doc.get('open');
                    //var title;
                    db.collection("email").doc(email).collection('friends').doc(name).collection('messages').doc().set({
                    "message":p,
                    "by": user.displayName,
                    "sent":firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(()=>{
                        db.collection('username').doc(name).get().then((doc)=>{
                            const em=doc.get('email');
                            db.collection("email").doc(em).collection('friends').doc(currentusername).collection('messages').doc().set({
                                "message":p,
                                "by": user.displayName,
                                "sent":firebase.firestore.FieldValue.serverTimestamp()
                                })
                        })
                    })
                }
                
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
            //handleBackClick();
        }
    

 

      
    return(
        <>
        <div className="topclass">
        
        <div>
       
            <p className="current">
            <span>
            <img 
            src={img} 
            alt="" 
            width={"50px"} style={{"borderRadius":"50%", "height":"50px","objectFit":"cover"}}/>
            </span>
                {currentname}
            </p>
            <div className="mess">
            {
                messages.map((value, key) => {
                return (
                    <div>        
                        
                        <p 
                        className="messbut" 
                        style={{"width":"80%"}}>
                           <span><p className="sender">{value[2]} </p></span>
                        {value[0]}
                        </p><br />
                        <p  style={{ "color":"tomato", "fontSize":"10px","paddingLeft":"70%"}}>{value[1]}</p>
                    </div>
                    );
                })
                
            
            }<h1 ref={messagesEndRef}></h1>
           
            </div>
        </div>

        
        <button type="submit" className="btn btn-primary" 
        onClick={()=>inp()} 
        style={{"float": "right"}}>
            send
        </button>
        <div className="typing" style={{"marginBottom":"20px"}}>
            <input type="text"
            className="form-control inpmes" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            placeholder="Enter message" 
            value={title}
            onChange={event => setTitle(event.target.value)}/>
        </div>
       


    </div>
    
  
           
    </>
    )
}

export default Messages;