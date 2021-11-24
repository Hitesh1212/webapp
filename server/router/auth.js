const express = require('express');

const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
require('../db/conn');
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');


let logic = ()=>{
    return Math.floor(Math.random()*1000)+1;
   
}
let logic1 = ()=>{
    
    let no1 = Math.random()*(100 - 1)+1;
         no1 = no1.toFixed(1);
         return no1;
}


// signup

router.post('/signup', async (req, res)=>{
    
    
    let {name, email, password, bar1, bar2, bar3, growth, loss} = req.body;
         bar1=logic();
         bar2=logic();
         bar3=logic();
         growth= logic1();
         loss= logic1();
     if(!name || !email || !password){
          return res.status(422).json({error: "plz fill form correctly"});
     }
    try{
         const userExist = await User.findOne({email:email});
         if(userExist){
             return res.status(422).json( { error: " email already exist "} );
         }
         else{
            
            
             const user = new User({ name, email, password, bar1, bar2, bar3, growth, loss});
                
             
             await user.save();
             res.status(201).json({ message: "registration succesfull"});
         }
      }catch(error){
          console.log(error);
      }
});

   // login
   router.post("/login", async (req, res)=> {
    try{
         const { email, password} = req.body;
         if(!email || !password) {
             return res.status(400).json({error: "plz fill data"});
         }
         const userLogin = await User.findOne({ email: email});

         if(userLogin){
              const isMatch = await bcrypt.compare(password, userLogin.password);

              const token = await userLogin.generateAuthToken();
                 //console.log(token);
                
                 res.cookie('jwtoken', token, {
                   expires: new Date(Date.now() + 25892000000),
                   httpOnly: true
                
                 })

             if(!isMatch){
               res.status(400).json( {error: "login faild!"});
             }
             else{

               
               res.json( {message: "login successful"});
              }
         } else {
             res.status(400).json({error: "invalid login"});
         }
         
         
    } catch (err) {
        console.log(err);
    }
});



router.get("/getdata", authenticate , (req, res)=> {
    
    res.send(req.rootUser);
});

module.exports = router;