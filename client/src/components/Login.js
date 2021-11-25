import React, {useState} from 'react';
import{ NavLink, useNavigate } from 'react-router-dom'

const Login = ()=> {
    const history = useNavigate();
    const [user, setUser] = useState({
      email:"", password:""
    });

    let name, value;

    const handleInputs = (e) => {
      name = e.target.name;
      value = e.target.value;

      setUser({...user, [name]:value});

    }
    const PostData = async (e) => {
       e.preventDefault();
      const {email, password} = user;

      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });

      try{
        if(data.status === 400 || !data) {
          
          window.alert("invalid login");
        }
        else{
          window.alert("login succesfull");
            history("/Dashboard");
        }
    
      } catch(error) {
           console.log(error)
      }
    }


    return(
        <>
       <div className="container">
       <h1 className="header"> Login</h1>

<form>
<div className="mb-3">
<label htmlFor="email1" className="form-label">Email address</label>
<input type="email" className="form-control" id="email1" aria-describedby="emailHelp" 
  name= "email"
  value={user.email}
  onChange={handleInputs}
  placeholder=" Your Email"

/>

</div>
<div className="mb-3">
<label htmlFor="password1" className="form-label">Password</label>
<input type="password" className="form-control" id="password1" 
  name="password"
  value={user.password}
  onChange={handleInputs}
  placeholder=" enter your password"

/>
</div>

<button type="submit" onClick={PostData}   className="btn btn-primary">Submit</button> <br/>

<NavLink to="/signup" className="text-center"> Sign up?</NavLink>
</form>
       </div>
        </>
    )

}

export default Login;
