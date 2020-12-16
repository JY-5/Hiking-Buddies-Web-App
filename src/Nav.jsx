import {   BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { useState } from 'react';
import { endSession } from './services';

const Nav = (props) => {
    const [status, setStatus] = useState('');
    const [searchInput, setSearchInput] = useState(''); 

    const logout = function() {
        endSession()
        .then( () => {
          props.onLogout();
        })
        .catch( err => {
            setStatus(err.error);
        });
    }

    return (
        <header className="app-header">
          <nav className="nav">
            <ul className="nav-ul">
              <li className="logo-li">
                <Link to="/" className="logo">
                  Hiking Buddies
                </Link>
              </li>
              <li>
                <input type="text" name="search" 
                  onChange={(e) => setSearchInput(e.target.value)} 
                  value={searchInput} className='search-input'/>
                <Link to={`/events/${searchInput}`} className='search' >
                  Search
                </Link>
              </li>
              <li>
                <Link to="/newEvent" className='add-new'>
                  Add a new event
                </Link>
              </li>  
              <li>      
                {props.isLoggedIn  ?
                  (<div className='logout'>
                      <span className='username'>Username: {props.username}</span>
                      <button onClick={logout}>Log out</button>
                    </div>) :
                  <Link to="/login" className='login'>Log in</Link>
                }
                { status && <div className="status">{status}</div>}
              </li>
            </ul>
          </nav>
        </header>
    );
  };
 
  export default Nav;


  