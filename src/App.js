import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
    // console.log(localStorage.getItem('is_authenticated'));
  }, []);

  return (
   <>
   { isAuthenticated 
   ? <Dashboard authenticated={setIsAuthenticated}/> 
   : <Login authenticated={setIsAuthenticated}/>}
   </>
  );
}

export default App;
