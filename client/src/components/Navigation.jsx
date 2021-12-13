import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";




import './components.css'

function Navigation(props) {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  const Username = userToken.username;

  const logout = () => {
    sessionStorage.removeItem('token');
    window.location.reload(false);
  }

  // -- ALERTS --//

  const [ count, setCount ] = useState(1);
  const timerId = setInterval(() => {
    //console.log('Check for ALERTS here');
    
  }, 60000);

  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark grid-bg-colour">
        <div class="container">
          <Link class="navbar-brand" to="/">
            {Username}'s WMS Portal
          </Link>
          
          
          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Stock
                  <span class="sr-only">(current)</span>
                </Link>
              </li>

              <li>
                <div className="spacer"></div>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Login" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/" onClick={logout}>
                    Sign Out
                </Link>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);