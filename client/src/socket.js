import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  notifyUser,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("read-the-message", data => {
    console.log(data);
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
      store.dispatch(notifyUser(data.message.conversationId));
    }
  });
});

export default socket;
