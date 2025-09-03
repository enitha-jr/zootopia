
import socket from "./socket";

export const sendMessage = (receiver_id, content) => {
  if (!socket.connected) {
    console.warn("Socket not connected");
    return;
  }
  socket.emit("send_message", { receiver_id, content });
};

export const listenMessages = (callback) => {
  socket.on("receive_message", (message) => {
    callback(message);
  });
};

export const removeMessageListener = () => {
  socket.off("receive_message");
};
