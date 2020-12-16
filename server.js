const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
const session = require('./session');
const eventData = require('./eventData');
const user = require('./user');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if( !sid) {
      res.status(401).json({ error: 'Please log in' });
      return;
    }
    if( !session.isValidSid(sid) ) {
      res.status(403).json({ error: 'Please log in' });
      return;
    }
    const username = session.sessions[sid].username;
    res.json(user.users[username]);
});

app.post('/api/session', (req, res) => {
    const { username, password } = req.body;
    const errorMessages = { 452: "Username was empty", 453: "Username contained disallowed characters", 454: "Username cannot be 'dog'"};
    const errors = session.isValidUsername(username);
    if(errors) {
      res.status(errors).json({ error : errorMessages[errors] });
      return;
    }
    const sid = session.create( username, password );
    user.addUser(username);
    res.cookie('sid', sid);
    res.json(user.users[username]);
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if( !sid ) {
      res.status(401).json({ error: 'Please log in' });
      return;
    }
    if( !session.isValidSid(sid) ) {
      res.status(403).json({ error: 'Please log in' });
      return;
    }
    session.remove(sid);
    res.clearCookie('sid');
    res.json({ sid, status: 'removed' });
});

app.get('/api/events', (req, res) => {
  res.json(eventData.events);
});

app.post('/api/event', (req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'Please log in' });
    return;
  }
  if( !session.isValidSid(sid) ) {
    res.status(403).json({ error: 'Please log in' });
    return;
  }
  const username = session.sessions[sid].username;
  const event = req.body.event;
  const id = eventData.create(event);
  user.addEvent(username, id);
  user.addSignup(username, id);
  res.json({ event, id });
});

app.post('/api/signup/:id', (req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'Please log in' });
    return;
  }
  if( !session.isValidSid(sid) ) {
    res.status(403).json({ error: 'Please log in' });
    return;
  }
  const eventId = req.params.id;
  const { username } = req.body;
  eventData.events[eventId].participants[username] = username;
  const error = user.addSignup(username, eventId);
  if (error) {
    res.status(error).json({ error });
    return;
  }
  res.json({"message": "sign up the event successfully"});
});

app.delete('/api/signup/:id', (req, res) => {
  const sid = req.cookies.sid;
  if( !sid ) {
    res.status(401).json({ error: 'Please log in' });
    return;
  }
  if( !session.isValidSid(sid) ) {
    res.status(403).json({ error: 'Please log in' });
    return;
  }
  const eventId = req.params.id;
  const { username } = req.body;
  delete eventData.events[eventId].participants[username];
  user.cancelSignup(username, eventId);
  res.json({ message: "cancel signup successfully" });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});