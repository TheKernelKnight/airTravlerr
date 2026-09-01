import React, { useState } from 'react';

interface Booking {
  id: string;
  userId: string;
  origin: string;
  destination: string;
  departureDate: string;
  cabinClass: string;
  status: string;
  bookingLink: string;
  createdAt: string;
  User?: {
    name: string;
    email: string;
    phone: string;
  };
}

const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === '1234') {
      setIsAuthenticated(true);
      fetchBookings();
    } else {
      setError('Invalid password. Hint: 1234');
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://airtravlerr.onrender.com/api';
      const response = await fetch(`${apiUrl}/bookings`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Bookings response:', data);
      
      if (data.success && data.data) {
        setBookings(data.data);
      } else {
        setBookings([]);
        setError('No bookings found or invalid response structure');
      }
    } catch (error) {
      console.error('❌ Error fetching bookings:', error);
      setError('Failed to fetch bookings. Please try again.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-500 text-sm mb-6">Enter password to access admin dashboard</p>
          
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Password (Hint: 1234)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
            <button
              onClick={fetchBookings}
              className="ml-4 text-sm underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Confirmed</p>
            <p className="text-3xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-gray-500">No bookings found</p>
            <p className="text-sm text-gray-400 mt-2">Bookings will appear here once users book flights</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passenger</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{booking.User?.name || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{booking.User?.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {booking.origin} → {booking.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(booking.departureDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.cabinClass === 'business' ? 'bg-purple-100 text-purple-800' :
                          booking.cabinClass === 'first' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.cabinClass}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => {
                            if (booking.bookingLink) {
                              window.open(booking.bookingLink, '_blank');
                            }
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;