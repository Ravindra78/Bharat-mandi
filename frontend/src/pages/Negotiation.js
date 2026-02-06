import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket';
import { apiFetch } from '../services/api';
import { useSelector } from 'react-redux';

const Negotiation = () => {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrCreateChat = async () => {
      try {
        let chatData = await apiFetch(`/chats/${id}`); // Assume id is listingId, adjust if needed
        if (!chatData) {
          chatData = await apiFetch('/chats', {
            method: 'POST',
            body: JSON.stringify({ listingId: id }),
          });
        }
        setChat(chatData);
        setMessages(chatData.messages || []);
        socket.emit('joinChat', chatData._id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrCreateChat();

    socket.on('newMessage', (msg) => setMessages((prev) => [...prev, msg]));

    return () => socket.off('newMessage');
  }, [id]);

  const sendMessage = () => {
    if (text.trim()) {
      socket.emit('sendMessage', { chatId: chat._id, senderId: user.id, text });
      setText('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Negotiate</h2>
      <div className="border rounded-lg p-4 h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <p key={i} className={`mb-2 ${msg.sender._id === user.id ? 'text-right' : 'text-left'}`}>
            <span className="font-semibold">{msg.sender.name}: </span>{msg.text}
          </p>
        ))}
      </div>
      <div className="mt-4 flex">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="flex-1 p-2 border rounded-l-md" />
        <button onClick={sendMessage} className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700">Send</button>
      </div>
    </div>
  );
};

export default Negotiation;