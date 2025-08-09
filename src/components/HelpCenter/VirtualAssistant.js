import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contactBanner from '../Assets/contact-banner.jpg';
import './VirtualAssistant.css';

const responses = [
  {
    keywords: ["where", "order", "track"],
    reply: "To track your order, go to 'My Account' > 'Orders'."
  },
  {
    keywords: ["return", "how", "item"],
    reply: "To return an item, visit 'My Account' > 'Orders' and follow the steps."
  },
  {
    keywords: ["cancel", "order"],
    reply: "You can cancel your order from 'My Account' if it hasn't been shipped."
  },
  {
    keywords: ["delivery", "time", "how long"],
    reply: "Standard delivery takes 3-5 business days. Next-day delivery is available."
  },
  {
    keywords: ["customs", "charges", "import"],
    reply: "You may be charged customs depending on your country's policies."
  },
  {
    keywords: ["payment", "fail", "issue"],
    reply: "Try using another payment method or contact your bank."
  },
  {
    keywords: ["help", "assist"],
    reply: "I'm here to help with orders, returns, delivery, and more."
  },
  {
    keywords: ["contact", "agent", "talk"],
    reply: "You can email support@example.com or visit our Help Center to talk to an agent."
  }
];

const VirtualAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm your Virtual Assistant. Ask me anything about your order, return, or delivery!" }
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();
    const matched = responses.find(item =>
      item.keywords.some(keyword => lowerInput.includes(keyword))
    );

    const botResponse = matched
      ? matched.reply
      : "Sorry, I didn't get that. Can you try rephrasing your question?";

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
    }, 500);

    setInput("");
  };

  return (
    <div 
      className="assistant-page-wrapper" 
      style={{ backgroundImage: `url(${contactBanner})` }}
    >
      <div className="assistant-container">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="assistant-header">Shopper Virtual Assistant</div>

        <div className="chat-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default VirtualAssistant;
