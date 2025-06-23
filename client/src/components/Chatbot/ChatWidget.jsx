import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const newUserMessage = { sender: 'user', text: query };
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          user_data: {
            user_id: 'u123',
            health_focus: 'stress',
            age: 30,
            gender: 'female',
            known_conditions: ['hypertension'],
            medications: ['amlodipine']
          }
        })
      });

      const data = await res.json();
      const botResponse = { sender: 'bot', text: data.response || data.error || "No response" };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error contacting bot' }]);
    }

    setQuery('');
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <img src="/robot-doc.gif" alt="Chatbot" />
      </div>

      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <h4>PraanCare Assistant</h4>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                <span>{msg.text}</span>
              </div>
            ))}
            {loading && <div className="chat-msg bot">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask PraanCare Assistant..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={sendMessage} disabled={loading}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
