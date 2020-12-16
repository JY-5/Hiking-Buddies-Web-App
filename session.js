const uuid = require('uuid').v4;
const sessions = {};

const isValidUsername = function( username ) {
    let errors;
  
    if(!username) {
      errors = 452;
    }
    const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, '');
    if(username !== cleanUsername) {
      errors = 453;
    } else if (username.toLowerCase() === "dog") {
      errors = 454;
    }
    return errors;
};

const create = function( username, password ) {
    const sid = uuid();
    // create session data, link to user
    sessions[sid] = {
      sid,
      username,
      password
    };
    return sid;
};

const remove = function(sid) {
    delete sessions[sid];
};

const isValidSid = function(sid) {
    return !!sessions[sid];
};

const session = {
    sessions,
    isValidUsername,
    create,
    remove,
    isValidSid,
  };
  module.exports = session;