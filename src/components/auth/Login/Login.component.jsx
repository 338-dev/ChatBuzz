import React, {useState} from "react"
import { NavLink } from "react-router-dom";
import firebase from "../../../server/firebase";
import { Message } from 'semantic-ui-react'
import Logo from "./wordpress-custom-login-page-form.png";


const Login =()=>{
 

    let user = {
        email: '',
        password: ''
    }

    let errors = [];

    const [userState, setuserState] = useState(user);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, seterrorState] = useState(errors);
    const [isSuccess, setIsSuccess] = useState(false);


    const handleInput = (event) => {
        let target = event.target;
        setuserState((currentState) => {
            let currentuser = { ...currentState };
            currentuser[target.name] = target.value;
            return currentuser;
        })
    }

    const checkForm = () => {
        if (isFormEmpty()) {
            seterrorState((error) => error.concat({ message: "Please fill in all fields" }));
            return false;
        }
        return true;
    }

    const isFormEmpty = () => {
        return !userState.password.length ||
            !userState.email.length;
    }

    const formaterrors = () => {

        return (
        
        errorState.map((error, index) => <p key={index}>{error.message}</p>
      ))
    }

 

    const onSubmit = (event) => {
        seterrorState(() => []);
        if (checkForm()) {
            setIsLoading(true);
            firebase.auth()
                .signInWithEmailAndPassword(userState.email, userState.password)
                .then(user => {
                  setIsSuccess(true)
                    setIsLoading(false);
                   
                   
                   
                    
                })
                .catch(serverError => {
                    setIsLoading(false);
                    seterrorState((error) => error.concat(serverError));
                })

        }
    }





  const style = {
    "margin":"20%",
    "marginBottom":"0%",
    "marginTop":"10%"
    };
  const stylem = {
    "backgroundColor": "lightGrey",
    "marginTop":"20px",
    "marginLeft":"30%",
    "marginRight":"30%",
    "border": "5px solid darkGrey",
    "borderRadius":"5px",
    "paddingTop":"0"
}
  const pass={
    "margin":"5% 20% 10% 20%", 
    "marginTop":"0%", 
    "marginBottom": "2%"
  }
  const styleqw = {
    "margin":"20%",
    "marginTop":"0%",
    "marginBottom":"0%"
  };
  const em={
    "margin":"5% 20% 10% 20%", 
    "marginBottom": "0%"
  }
  const log={
    "marginBottom": "-10%",
    "marginTop": "0%"
  }
  const main={
    "backgroundColor": "rgb(249, 250, 216)", 
    "marginRight": "13%", 
    "marginLeft": "13%", 
    "borderRadius": "20px"
  }


  const css = `
  body {
      background-color: rgb(93, 9, 34);
  }
`
    return (<>
    <style>{css}</style>  
      <div style={main}>
      <form style={style}>
      
      <div >
      <br/><br/><br/><br/> 

      <center>
        <h3>Enter your details</h3>
      </center>

      <center>
        <img src={Logo} alt="" width="30%"  style={log}/>
      </center>

      <div style={em}>
        <input 
        style={{"borderRadius": "20px"}} 
        name="email" value={userState.email} 
        onChange={handleInput} 
        type="email" 
        placeholder="Enter email"
        className="form-control" 
        id="email" 
        aria-describedby="emailHelp"/>
      </div>
    <br />
      <div  style={pass}>
        <input  
        style={{"borderRadius": "20px"}}
        name="password" 
        value={userState.password} 
        onChange={handleInput} 
        type="password" 
        placeholder="Enter Password" 
        className="form-control" 
        id="password"/>
      </div>
      </div>
</form>

    <center>
      <button 
      onClick={onSubmit} 
      disabled={isLoading} 
      loading={isLoading} 
      className="btn btn-primary"
      style={styleqw}>
        
      Submit
      </button>
      <br />
    <small style={style}>Not a user?
      <NavLink
    className="navbar-item"
    
    to="/Register"
    exact
>
	Sign Up
</NavLink></small>
<br /><br /><br /><br />
</center></div>

    <div>{errorState.length > 0 && <Message error style={stylem}>
      <center><h3>Errors</h3>
      {formaterrors()}</center>
      </Message>
        }
           
    {isSuccess && errorState.length===0 &&<Message success style={stylem}>
        <center><h3>Successfully Loggedin</h3>
        <p>User is successfully loggedin</p></center>
    </Message>
    }</div>
        
   </>)
    
}

export default Login;