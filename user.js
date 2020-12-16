const users = {
    "Amit": {username: "Amit", events: {1: "1", 2: "2"}},
    "Bao": {username: "Bao", events: {2: "2"}},
    "Mary": {username: "Mary", events: {1: "1"}},
    "John": {username: "John", events: {1: "1", 2: "2"}},
    "Harris": {username: "Harris", events: {1: "1"}},
    "Lily": {username: "Lily", events: {2: "2"}},
    "Li": {username: "Li", events: {2: "2"}},
    "David": {username: "David", events: {2: "2"}},
    "San Jose Parks: Volunteer Management Team": {username: "San Jose Parks: Volunteer Management Team", events: {1: "1"}, host: {1: "1"}},
    "Joseph Corrar": {username: "Joseph Corrar", events: {2: "2"}, host: {2: "2"}}
};

const addUser = function(username) {
    if (!users[username]) {
        users[username] = {username, events: {}, host: {}};
    }  
}      

const addEvent = (username, id) => {
    users[username].host[id] = id;
}

const removeEvent = () => {

}

const addSignup = (username, id) => {
    users[username].events[id] = id;
}

const cancelSignup = (username, eventId) => {
    delete users[username].events[eventId];
}

const user = {
    users,
    addUser,
    addEvent,
    removeEvent,
    addSignup,
    cancelSignup
};

module.exports = user;