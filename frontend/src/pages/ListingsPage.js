import React, { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import ListingCard from '../components/ListingCard';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      const endpoint = search ? `/api/products/search?q=${search}` : '/products';
      try {
        const data = await apiFetch(endpoint);
        setListings(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchListings();
  }, [search]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Browse Produce</h2>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search produce..." className="w-full p-2 mb-4 border rounded-md" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {listings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}
      </div>
    </div>
  );
};

export default Listings;