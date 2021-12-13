import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Stock, Footer } from "./components";
import useToken from './useToken.js';
import Login from './components/Login/Login'



function App() {
  
  const { token, setToken } = useToken();
  
  if(token && token!=='q>)*8n[TfhTyZAW') {
    alert("Invalid Log-in Token");
    localStorage.removeItem('token');
  }
  
  
  if(!token) {
    return <Login setToken={setToken} />
  }
  
  
  
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          
          <Route path="/" exact component={() => <Stock />} />
          
        </Switch>
        <Footer />
        
      </Router>
    </div>
  );
}
export default App;