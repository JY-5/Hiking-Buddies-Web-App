import './App.css';
import { useHistory, Switch, Route, Link, Redirect } from "react-router-dom";
import Nav from "./Nav";
import Home from './Home';
import { useState, useEffect } from 'react';
import Login from './Login';
import AddEvent from './AddEvent';
import Event from './Event';
import { getEvents, getSession } from './services';
import SearchResult from './SearchResult';

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false, isPending: true, 
                                              user: {username: "", events: {}} });
  const [eventsState, setEventsState] = useState({ events: {}, isLoading: false, error: ""});

  let history = useHistory();

  useEffect( () => {
    setEventsState({ isLoading: true });
    getEvents()
    .then( events => {
        setEventsState({ 
          error: '', 
          isLoading: false, 
          events: events 
        });
      }) 
    .catch((err) => {
      setEventsState({ 
        isLoading: false, 
        error: err.error 
      });
    })

    setUserState({...userState, isLoading: true });
    getSession()
    .then( user => {
      setUserState({
          isLoggedIn: true,
          isError: '', 
          isLoading: false, 
          user: user 
        });
      }) 
    .catch((err) => {
      setUserState({ 
        isLoggedIn: false,
        isLoading: false, 
        isError: err.error 
      });
    })
  }, []);

  const reload = () => {
    setEventsState({ isLoading: true });
    getEvents()
    .then( events => {
        setEventsState({ 
          error: '', 
          isLoading: false, 
          events: events 
        });
      }) 
    .catch((err) => {
      setEventsState({ 
        isLoading: false, 
        error: err.error 
      });
    })

    setUserState({...userState, isLoading: true });
    getSession()
    .then( user => {
      setUserState({
          ...userState,
          isError: '', 
          isLoading: false, 
          user: user 
        });
      }) 
    .catch((err) => {
      setUserState({ 
        ...userState,
        isLoading: false, 
        isError: err.error 
      });
    })
  }

  const onLogin = function(user) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
      user
    });
  };

  const onLogout = function() {
    setUserState({
      isLoggedIn: false,
    });
  };

  if (!eventsState.events) {
    return null;
  }

  return (
      <div className="App">
        <Nav isLoggedIn={userState.isLoggedIn} 
          username={userState.user ? userState.user.username : null} onLogout={onLogout}/>

        <div className="content">
          <Switch>
            <Route path="/login" render={() => <Login onLogin={onLogin}/>}/>
            <Route path="/events/:name"
              render={({ match }) => 
              <SearchResult keyword={`${match.params.name}`} eventsState={eventsState}/>}
            />
            <Route path="/newEvent"  
              render={() => (userState.isLoggedIn ? 
              <AddEvent reload={reload} username={userState.user.username}/> : 
              <Login onLogin={onLogin} prompt="Please log in first"/>)}/> 
            <Route path="/event/login" render={() => 
              <Login onLogin={onLogin} prompt="Please log in first" />}/>
            <Route path="/event/:id" 
              render={({ match }) => 
              <Event 
                event={eventsState.events[match.params.id]}
                username={userState.user ? userState.user.username : null} 
                reload={reload}
              />} 
            />
            <Route path="/" render={() => <Home eventsState={eventsState} userState={userState}/>}/>
          </Switch>
        </div>
      </div>
  );
}

export default App;
