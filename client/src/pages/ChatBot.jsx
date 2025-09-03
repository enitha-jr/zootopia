import React, { useState } from "react";
import chatServices from "../services/chatServices";
import { useSelector } from "react-redux";
import "../styles/ChatBot.css";
import simba from '../assets/images/simba.jpg';

import ReactMarkdown from "react-markdown";

function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    const newMessages = [...messages, { sender: "user", text: prompt }];
    setMessages(newMessages);
    setPrompt("");
    setLoading(true);

    try {
      const data = await chatServices.getAIResponse(prompt);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.reply },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: " Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className={`chatbot-container ${messages.length === 0 ? "empty" : ""}`}>
      <div className="chatbot-title">
        Hi {auth.username}, I am Simba Ask me anything...
      </div>

      <div className={`chatbot-box ${messages.length === 0 ? "no-messages" : ""}`}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chatbot-message ${msg.sender === "user" ? "user" : "ai"
              }`}
          >
            {msg.sender === "ai" && (
              <div className="chatbot-avatar">
                <img src={simba} alt="AI Avatar" />
              </div>
            )}
            <div className="chatbot-text">
              <ReactMarkdown components={{ p: 'span' }}>
                {msg.text}
              </ReactMarkdown>
            </div>
            {/* <div>{msg.text}</div> */}
          </div>
        ))}

        {loading && (
          <div className="chatbot-message ai typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <form className="chatbot-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={loading}>
          {
            loading ? ". . . ." : "Send"
          }
        </button>
      </form>
    </div>
  );
}

export default ChatBot;
