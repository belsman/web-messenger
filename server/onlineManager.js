const onlineUsersManager = {
  onlineUsers: new Map(),
  getUser(userId) {
    const user = this.onlineUsers.get(userId);
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
      this.onlineUsers.set(userId, socketId);
    }
    return true;
  },
  removeUser(userId) {
    return this.onlineUsers.delete(userId);
  }
}

module.exports = onlineUsersManager;
