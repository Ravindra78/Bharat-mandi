import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { productAPI } from '../services/api';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-8">
        <img src="https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.jpg?s=612x612&w=0&k=20&c=gvu-DzA17EyVSNzvdf7L3R8q0iIvLapG15ktOimqXqU=" alt="Logo" className="mb-4 h-12" />
        <h2>Please log in to view dashboard</h2>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {user && (
        <div className="mb-8 p-4 bg-blue-50 rounded">
          <h2 className="text-xl font-semibold">Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      <h3 className="text-2xl font-semibold mb-4">Products</h3>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded p-4 shadow">
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Dashboard;
