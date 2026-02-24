const sessionIdToUserMap = new Map();

const setUserSession = (id, user) => {
    sessionIdToUserMap.set(id, user);
}

const getUserSession = (id) => {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUserSession,
    getUserSession,
}