const onlineUsersManager = {
  onlineUsers: [],
  getUser(userId) {
    const user = this.onlineUsers.find(user => user.userId === userId);
    return user?.socketId;
  },
  isUserOnline(userId) {
    return !!this.getUser(userId);
  },
  isUserOffline(userId) {
    return !this.isUserOnline(userId);
  },
  addUser(userId, socketId) {
    return this.isUserOffline(userId) && this.onlineUsers.push({ userId, socketId });
  },
  removeUser(userId) {
    if (this.isUserOnline(userId)) {
      const userIndex = this.onlineUsers.findIndex(user => user.userId === userId);
      this.onlineUsers.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}

module.exports = onlineUsersManager;
