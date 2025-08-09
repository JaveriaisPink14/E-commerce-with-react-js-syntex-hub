import React, { useState } from 'react';

const SmartBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Thanks! We'll get back to you soon.", sender: "bot" }]);
    }, 1000);
    setInput("");
  };

  return (
    <div className="smart-bot">
      <h2>💬 Talk to our Virtual Assistant</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <input
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default SmartBot;
