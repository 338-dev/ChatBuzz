import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { Message } from 'semantic-ui-react'
import Logo from "./Untitled.png";
import firebase from '../../../server/firebase';



const Register =()=>{
    let user={
        userName:'',
        email:'',
        password:'',
        confirmPassword:'',
    }

    let errors = [];

    const[userState, setuserState] = useState(user);
    const [errorState, seterrorState] = useState(errors);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInput =(event)=>{
        let target =event.target;
        setuserState((currentState)=>{
            let currentuser={ ...currentState };
            currentuser[target.name]=target.value;
            return currentuser;
        })

    }

const checkForm=()=>{
    if(isFormEmpty())
    {
        seterrorState((error) => error.concat({ message: "Please fill in all fields" }));
        return false;
    }
    else if(!checkPassword())
    {
        return false;
    }
    return true;
}

const isFormEmpty=()=>{
    return !userState.userName.length||
    !userState.password.length ||
    !userState.confirmPassword.length ||
    !userState.email.length;
}

const checkPassword=()=>{
    if(userState.password.length<8)
    {
        seterrorState((error) => error.concat({ message: "Password length should be greater than 8" }));
        return false;
    }
    else if(userState.confirmPassword!==userState.password)
    {
        seterrorState((error) => error.concat({ message: "Password and Confirm Password does not match" }));
        return false;
    }
    return true;
}


const onSubmit=(event)=>{
    seterrorState(() => []);
        setIsSuccess(false);
        if (checkForm()) {

            setIsLoading(true);
            firebase.auth()
                .createUserWithEmailAndPassword(userState.email, userState.password)
                .then(createdUser => {
                    updateuserDetails(createdUser);
                    setIsLoading(false);
                   
                })
                .catch(serverError => {
                    setIsLoading(false);
                    seterrorState((error) => error.concat(serverError));
                })

        }
}
    

      const updateuserDetails = (createdUser) => {
        if (createdUser) {
            setIsLoading(true);
            createdUser.user
                .updateProfile({
                    displayName: userState.userName,
                    photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`
                })
                .then(() => {
                   // setIsLoading(false);
                   setIsLoading(true);
                       // navigate("/Username");
                   
                                     
                     // saveUserInDB(createdUser);
                })
                .catch((serverError) => {
                    setIsLoading(false);
                    seterrorState((error) => error.concat(serverError));
                })
        }
    }
 
  
      const formaterrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }


    const style = {
        "marginBottom":"0%"
      };
      const styleqw = {
        "marginTop":"0%",
        "marginBottom":"0%",
        "margin":"auto"
      };
      const stylem = {
        "borderRadius":"5px",        
        "paddingTop":"0"
    }
    const css = `
    body {
        background-color: rgb(93, 9, 34);
    }
  `
    return (<>
  
    <div>
    <div style={{"padding":"5%","paddingBottom":"2%","paddingTop":"0.1%", "borderRadius": "20px"}}>
    <form style={style}>
    <center><h3>Register your email</h3><br />
        <img src={Logo} alt="" width="17%"/></center>
        <div className="row">
          <div className="col">
          
            <input style={{"borderRadius": "20px"}} type="text"
            value={userState.userName} name="userName"className="form-control" placeholder="Enter name" onChange={handleInput}/>
          </div>

          <div className="col">
          
            <input style={{"borderRadius": "20px"}} type="email" value={userState.email} className="form-control" name="email" aria-describedby="emailHelp" placeholder="Your email address" onChange={handleInput}/>
         </div>
        </div>
<br />
       
      <div className="row">
      <div className="col">
        <input style={{"borderRadius": "20px"}} type="password" value={userState.password}  className="form-control" name="password" placeholder="Enter your password" onChange={handleInput}/>
      </div>

      <div className="col">
            <input style={{"borderRadius": "20px"}} type="password" value={userState.confirmPassword}className="form-control" name="confirmPassword" placeholder="confirm pasword"  onChange={handleInput}/>
          </div>
          </div><br />

      
      
      </form>
      <center>
      <button style={styleqw} className="btn btn-primary" onClick={onSubmit} disabled={isLoading} loading={isLoading}>Submit</button></center>
      
      </div>
      <center>
          {errorState.length > 0 && <Message error style={stylem}>
                <h3>Errors</h3>
                {formaterrors()}
            </Message>
            }
            {isSuccess && <Message success style={stylem}>
                <h3>Successfully Registered</h3>
                <p>User is successfully registered</p>
            </Message>
            }
</center></div>
</>)
}

export default Register;