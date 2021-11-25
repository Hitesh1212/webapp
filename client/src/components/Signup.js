import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = ()=> {
       const history = useNavigate();

    const [user, setUser] = useState({
        name:"", email:"", password:""
    });
    
     
    
      const handleInputs = (e) => {
        
        
        setUser({ ...user, [e.target.name]:e.target.value});
        
      }
      
      const PostData = async (e)=> {
      e.preventDefault();
    
      const { name, email, password } = user;
     
      const data = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            name, email, password
          })
      });
        
      // const res = await  data.json();
      //    console.log(res);
         
      try{
        if(data.status === 422 || !data) {
          
          window.alert("invalid registration");
        }
        else{
          window.alert("registration succesfull");
            history("/");
        }
    
      } catch(error) {
           console.log(error)
      }
         
       
      }



    return(
        <>

        <div className="container">
        <h1 className="header">Signup</h1>

<form method="POST">
<div className="mb-3">
<label htmlFor="name" className="form-label">Name </label>
<input type="text" className="form-control" id="name" aria-describedby="emailHelp"
    name= "name"
    value={user.name}
    onChange={handleInputs}
    placeholder=" Your Name"
  />

</div>
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

<button type="submit" onClick={PostData} className="btn btn-primary" >Submit</button> <br/>
<NavLink to="/" className="text"> Login ?</NavLink>
</form>
        </div>
     
        </>
    )

}

export default Signup;
