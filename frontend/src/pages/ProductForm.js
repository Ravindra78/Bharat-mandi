import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createListing } from '../redux/actions/productActions';

const ProductForm = () => {
  const [produceName, setProduceName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('produceName', produceName);
    formData.append('price', price);
    formData.append('quantity', quantity);
    if (file) formData.append('image', file);

    dispatch(createListing(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input type="text" value={produceName} onChange={(e) => setProduceName(e.target.value)} placeholder="Produce Name" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700">Create Listing</button>
    </form>
  );
};

export default ProductForm;
