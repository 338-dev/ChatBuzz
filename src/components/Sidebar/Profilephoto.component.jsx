import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//
import avatar from './avatar.png'
import firebase from 'firebase/compat';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '2px',
  boxShadow: 24,
  color:"black",
  p: 4,
  borderRadius:"20px"
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  var auth=firebase.auth();
  const [image , setImage] = useState('');
  const [url, setUrl]=useState('');
  const user = firebase.auth().currentUser;
  var db=firebase.firestore();
  var email;
try {
    document.getElementById("dropdown-basic").innerText=user.displayName;
    email=user.email;
   // console.log(email)
  } catch (error) {
    
  }
  const upload = ()=>{
    if(image == null)
      return;
    firebase.storage().ref(`/images/${auth.currentUser.email}`).put(image)
    .then(()=>{

        var imglink;
        firebase.storage().ref(`/images/${auth.currentUser.email}`).getDownloadURL().then(imgUrl=>{
            var up;
            setUrl(imgUrl);
            console.log("success")
            console.log(imgUrl);
            var reference=db.collection("email").doc(user.email);
            reference
            .update(
            {
                "imgUrl":imgUrl
            })
            .then(()=>{
              alert("email")
                
                console.log("updated successfully")
                reference.get().then((doc)=>{
                  up=doc.data().username;
                  alert(up);
                })
                
                console.log("$");
            })
            
            
        })
        handleClose();
    });
  }
  db.collection('email').doc(email).get()
  .then((doc)=>{
    setUrl(doc.get('imgUrl'));
  })
  return (
    <div>
        
      <center>
          <Button onClick={handleOpen} style={{"borderRadius":"50%","marginRight":"50%"}}><img src={url} alt="userImg" width={"100px"} style={{"borderRadius":"50%", "height":"100px","objectFit":"cover"}}/></Button></center>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img src={url} alt="userImg" width={"100px"} style={{"borderRadius":"50%", "height":"100px","objectFit":"cover"}}/>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Profile Photo
          </Typography>
          <input id="file-input" type="file" onChange={(e)=>{setImage(e.target.files[0]);}} />
          <br />
          <Button onClick={()=>{upload();}}>Upload</Button>
        </Box>
      </Modal>
    </div>
  );
}
