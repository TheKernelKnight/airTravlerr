import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Loader2 } from 'lucide-react';

// Airport data for autocomplete
const AIRPORTS = [
  { code: 'JFK', city: 'New York', country: 'USA' },
  { code: 'LHR', city: 'London', country: 'UK' },
  { code: 'DXB', city: 'Dubai', country: 'UAE' },
  { code: 'CDG', city: 'Paris', country: 'France' },
  { code: 'NRT', city: 'Tokyo', country: 'Japan' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore' },
  { code: 'SYD', city: 'Sydney', country: 'Australia' },
  { code: 'LAX', city: 'Los Angeles', country: 'USA' },
  { code: 'MIA', city: 'Miami', country: 'USA' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand' },
];

const Hero: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Autocomplete logic
  useEffect(() => {
    if (from.length > 0) {
      const filtered = AIRPORTS.filter(airport => 
        airport.city.toLowerCase().includes(from.toLowerCase()) ||
        airport.code.toLowerCase().includes(from.toLowerCase())
      );
      setFromSuggestions(filtered.slice(0, 5));
    } else {
      setFromSuggestions([]);
    }
  }, [from]);

  useEffect(() => {
    if (to.length > 0) {
      const filtered = AIRPORTS.filter(airport => 
        airport.city.toLowerCase().includes(to.toLowerCase()) ||
        airport.code.toLowerCase().includes(to.toLowerCase())
      );
      setToSuggestions(filtered.slice(0, 5));
    } else {
      setToSuggestions([]);
    }
  }, [to]);

  const handleSearch = async () => {
    if (!from || !to) {
      alert('Please enter both origin and destination');
      return;
    }

    setLoading(true);
    setShowResults(false);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://airtravlerr.onrender.com/api';
      
      const response = await fetch(`${apiUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: from,
          destination: to,
          departureDate: new Date().toISOString().split('T')[0]
        })
      });

      const data = await response.json();
      console.log('✅ Search results:', data);
      
      const flights = data.data || data.flights || [];
      
      if (flights.length > 0) {
        setResults(flights);
        setShowResults(true);
        alert(`✅ Found ${flights.length} flights!`);
      } else {
        alert('No flights found for this route');
      }
    } catch (error) {
      console.error('❌ Search error:', error);
      alert('Search failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookFlight = (flight: any) => {
    const name = prompt('Enter your full name:');
    if (!name) return;
    
    const email = prompt('Enter your email:');
    if (!email) return;
    
    const phone = prompt('Enter your phone number:');
    if (!phone) return;

    // Send booking request
    fetch(`${import.meta.env.VITE_API_URL || 'https://airtravlerr.onrender.com/api'}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        flightData: flight
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert(`✅ Booking confirmed! Booking ID: ${data.data.bookingId}`);
      } else {
        alert('❌ Booking failed. Please try again.');
      }
    })
    .catch(err => {
      console.error('Booking error:', err);
      alert('❌ Booking failed. Please try again.');
    });
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Exclusive insider fares</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Save Up to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                64%
              </span>{' '}
              On International Business & First-Class
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Unlock exclusive access to private fares airlines don't want you to see. 
              Experience luxury travel at economy prices.
            </p>

            {/* Search Form with Autocomplete */}
            <div className="bg-white p-4 rounded-2xl shadow-xl shadow-blue-100/50 border border-blue-50">
              <div className="space-y-3">
                {/* From input with autocomplete */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="From: City or Airport"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                  {fromSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      {fromSuggestions.map((airport, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setFrom(`${airport.city} (${airport.code})`);
                            setFromSuggestions([]);
                          }}
                        >
                          <span className="font-medium">{airport.city}</span>
                          <span className="text-gray-500 text-sm ml-2">({airport.code})</span>
                          <span className="text-gray-400 text-sm ml-2">{airport.country}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* To input with autocomplete */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="To: City or Airport"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                  {toSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      {toSuggestions.map((airport, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setTo(`${airport.city} (${airport.code})`);
                            setToSuggestions([]);
                          }}
                        >
                          <span className="font-medium">{airport.city}</span>
                          <span className="text-gray-500 text-sm ml-2">({airport.code})</span>
                          <span className="text-gray-400 text-sm ml-2">{airport.country}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <span>Search Flights</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Flight Results */}
            {showResults && results.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">✈️ Available Flights</h3>
                {results.map((flight, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{flight.airline}</p>
                        <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                        <p className="text-sm text-gray-600">
                          {flight.origin} → {flight.destination}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                        <p className="text-sm text-gray-400 line-through">${flight.originalPrice}</p>
                        <p className="text-sm text-green-600 font-medium">Save {flight.savings}%</p>
                        <button
                          onClick={() => handleBookFlight(flight)}
                          className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">10k+ travelers saved</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-200/50">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury travel"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;