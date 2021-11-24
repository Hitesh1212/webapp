import React, {useState, useEffect} from 'react';

const Dashboard = ()=> {

    const [userData, setUserData] = useState({}); 
    
    const callAboutPage = async () => {
      try{
          const res = await fetch('/getdata', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
          });

          const data = await res.json();
         // console.log(data.name);
          setUserData(data);
          
          if(!res.status === 200){
            console.log("err");
            const error = new Error(res.error);
            throw error;
          }
         
      }catch(err){
        console.log(err);
        
      }
    }
  useEffect( ()=> {
    callAboutPage();
  }, []);


    return(
        <>
        <div className="container">
        <h3 className="header">Welcome {userData.name}</h3>
        <div className="mb-3">
        <div className="row">
             <div className="col-md-4">
                 <h4>
                     {userData.bar1}<br/>
                     india
                 </h4>

                 </div>
                 <div className="col-md-4">
                 <h4>
                     {userData.bar2}<br/>
                     oman
                     
                 </h4>
                 </div>
                 <div className="col-md-4">
                 <h4>
                     {userData.bar3} <br/>
                     usa
                 </h4>
                 </div>
        </div>
        </div>
        <div className="mb-3">
        <div className="row">
             <div className="col-md-4">
             <h1 className="growth">    <div >Growth</div>
                     {userData.growth} %
                 </h1>
                 </div>
                 <div className="col-md-4">
                 <h1 className="loss">  <div>Loss</div>
                     {userData.loss} %
                 </h1>
                 </div>
                 
        </div> 
        </div>

        </div>
        </>
    )

}

export default Dashboard;