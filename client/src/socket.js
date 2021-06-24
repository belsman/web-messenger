import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  notifyUser,
} from "./store/conversations";

const socket = io(window.location.origin, {
  autoConnect: false,
});

socket.on("connect_error", (err) => {
  console.log(err);
});

socket.on("disconnect", (data) => {
  console.log("Socket closed! You are logged out");
});

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
    const { conversations, activeConversation } = store.getState();
    const conversationId = data.message.conversationId;

    const convo = conversations.find(conv => conv.id === conversationId);
    const { otherUser } = convo;

    if (otherUser?.username === activeConversation) {
      socket.emit("mark-message-as-read", data.message.id);
    } else {
      store.dispatch(notifyUser(
        {
          convoId: data.message.conversationId,
          messageId: data.message.id
        }
      ));
    }
  });
});

socket.onAny((event, ...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(event, args);
  }
});

export default socket;
