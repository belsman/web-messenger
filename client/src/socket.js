import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
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
  });
});

socket.onAny((event, ...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(event, args);
  }
});

export default socket;
