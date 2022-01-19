import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import firebase from "../../../server/firebase";
import avatar from './avatar.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  var auth=firebase.auth();
  const [image , setImage] = useState('');
  const [url, setUrl]=useState(avatar);
  const user = firebase.auth().currentUser;

  const upload = ()=>{
    if(image == null)
      return;
    firebase.storage().ref(`/images/${auth.currentUser.email}`).put(image)
    .then(()=>{
        firebase.storage().ref(`/images/${auth.currentUser.email}`).getDownloadURL().then(imgUrl=>{
            setUrl(imgUrl);
            console.log("success")
            console.log(imgUrl);
        })
        handleClose();
    });
  }

  return (
    <div>
        
      <center>
          <Button onClick={handleOpen}><img src={url} alt="userImg" width={"100px"} style={{"borderRadius":"50%", "height":"100px","objectFit":"cover"}}/></Button></center>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Profile Photo
          </Typography>
          <input id="file-input" type="file" onChange={(e)=>{setImage(e.target.files[0]);}} />
          <br />
          <Button onClick={()=>{upload();}}>Upload</Button>
        </Box>
      </Modal>
    </div>
  );
}
