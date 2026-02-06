import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleChat = () => {
    // Navigate to chat page with listing ID
    navigate(`/chat/${listing._id}`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg">
      {listing.image && (
        <img
          src={`${process.env.REACT_APP_API_URL}${listing.image}`}
          alt={listing.produceName}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
      )}
      <h3 className="text-lg font-semibold">{listing.produceName}</h3>
      <p className="text-gray-600">Price: ₹{listing.price}</p>
      <p className="text-gray-600">Quantity: {listing.quantity} kg</p>

      <div className="mt-2 flex gap-2">
        <Link
          to={`/negotiation/${listing._id}`}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-center"
        >
          Negotiate
        </Link>

        <button
          onClick={handleChat}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Chat
        </button>
        
      </div>
    </div>
  );
};

export default ListingCard;
