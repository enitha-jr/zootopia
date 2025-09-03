import React from 'react'
import { useEffect, useState, useRef } from "react";
import { sendMessage, listenMessages, removeMessageListener } from "../../socketio/socketServices";
import messageServices from "../../services/messageServices";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/Message.css";
import { VscSend } from "react-icons/vsc";

const ChatWindow = ({ receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [msgContent, setMsgContent] = useState("");
    const chatEndRef = useRef(null);
    const auth = useSelector((state) => state.auth);
    const location = useLocation();

    const username = location.state?.username || `User ${receiverId}`;

    useEffect(() => {
        listenMessages((msg) => {
            setMessages((prev) => {
                if (prev.some(m => m.msg_id === msg.msg_id)) return prev; // skip duplicates
                return [...prev, msg];
            });
        });
        return () => removeMessageListener();
    }, [])

    // Scroll to bottom whenever messages update
    useEffect(() => {
        if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!receiverId || !msgContent) return alert("Receiver ID and message are required");
        sendMessage(receiverId, msgContent);
        setMsgContent("");
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await messageServices.getMessageHistory(receiverId);
                setMessages(data);
            }
            catch (error) {
                console.error("Error fetching message history:", error);
            }
        }
        if (receiverId) fetchHistory();
    }, [receiverId]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                {username}
            </div>
            <div className="message-history">
                {messages.length === 0 && (
                    <div className="no-messages">Start the conversation </div>
                )}
                {messages.map((msg, index) => (
                    <div className={`message-item ${msg.sender_id === auth.user_id ? "sent" : "received"}`}
                        key={msg.msg_id || `${msg.sender_id}-${msg.receiver_id}-${index}`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={msgContent}
                    onChange={(e) => setMsgContent(e.target.value)}
                    required
                    className="message-input"
                />
                <button type="submit" className="send-button"><VscSend /></button>
            </form>
        </div>
    )
}

export default ChatWindow