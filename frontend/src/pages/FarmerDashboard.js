import React from 'react';
import ListingForm from '../components/FormComponents/ListingForm';

const FarmerDashboard = () => {
  const handleListingSuccess = (listing) => {
    console.log('Listing created', listing);
    // Refresh listings or show success
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Farmer Dashboard</h2>
      <ListingForm onSuccess={handleListingSuccess} />
      {/* Add list of own listings */}
    </div>
  );
};

export default FarmerDashboard;