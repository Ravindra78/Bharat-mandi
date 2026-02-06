import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getChatService, addMessageService } from '../services/chatService';

const ChatWindow = () => {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const data = await getChatService(id);
        setChat(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChat();
  }, [id]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const updatedChat = await addMessageService(id, message);
      setChat(updatedChat);
      setMessage('');
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  };

  if (!chat) return <p>Loading chat...</p>;

  return (
    <div className="max-w-md mx-auto border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">Chat about: {chat.listing.produceName}</h2>
      <div
        ref={scrollRef}
        className="h-64 overflow-y-auto border p-2 mb-2"
      >
        {chat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-1 my-1 rounded ${
              msg.sender._id === chat.buyer._id ? 'bg-green-100 text-left' : 'bg-blue-100 text-right'
            }`}
          >
            <strong>{msg.sender.name}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
