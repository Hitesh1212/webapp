import Login from './components/Login'; 
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

import { Routes, Route  } from 'react-router-dom';

function App() {
  return (
    <>
      
         <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/Signup" element={<Signup />} />
       <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
       
    
   
   
  
    
    
     
    </>
  );
}

export default App;
