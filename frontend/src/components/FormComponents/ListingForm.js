import React, { useState } from 'react';
import { apiFetch } from '../../services/api';

const ListingForm = ({ onSuccess }) => {
  const [produceName, setProduceName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('produceName', produceName);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const data = await apiFetch('/products', {
        method: 'POST',
        body: formData,
        headers: {} // No Content-Type for FormData
      });
      onSuccess(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={produceName} onChange={(e) => setProduceName(e.target.value)} placeholder="Produce Name" className="w-full p-2 border rounded-md" required />
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" className="w-full p-2 border rounded-md" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full p-2 border rounded-md" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded-md" />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border rounded-md" />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700">Create Listing</button>
    </form>
  );
};

export default ListingForm;