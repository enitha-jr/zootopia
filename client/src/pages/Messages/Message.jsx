import React, { useEffect, useState, useRef } from "react";
import "../../styles/Message.css";
import { useParams } from "react-router-dom";
import Inbox from "./Inbox";
import ChatWindow from "./ChatWindow";

function Message() {
  const { receiverId } = useParams();
  return (
    <div className="message-container">
      <Inbox />
      <div className="chat-window">
        {
          receiverId ? (
            <ChatWindow receiverId={receiverId} />
          ) : (
            <div className="no-chat-selected">
              Select a chat to start conversation
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Message;
