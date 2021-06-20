const onlineUsersManager = {
  onlineUsers: new Map(),
  getUser(userId) {
    const user = this.onlineUsers[userId];
    return user;
  },
  isUserOnline(userId) {
    return !!this.getUser(userId);
  },
  isUserOffline(userId) {
    return !this.isUserOnline(userId);
  },
  addUser(userId, socketId) {
    if (this.isUserOffline(userId)) {
      this.onlineUsers[userId] = socketId
    }
    return this.getUser(userId);
  },
  removeUser(userId) {
    if (this.isUserOnline(userId)) {
      return delete this.onlineUsers[userId];
    }
    return false;
  }
}

module.exports = onlineUsersManager;
