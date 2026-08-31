import React, { useState } from 'react';
import { ArrowRight, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!from || !to) {
      alert('Please enter both origin and destination');
      return;
    }

    setLoading(true);
    console.log('🔍 Searching:', { from, to });

    try {
      const response = await fetch('https://airtravlerr.onrender.com/api/search', {
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
      
      if (data.success) {
        setResults(data.data);
        alert(`Found ${data.data.length} flights! Check console for details.`);
      } else {
        alert('No flights found or error occurred');
      }
    } catch (error) {
      console.error('❌ Search error:', error);
      alert('Search failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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

            <div className="bg-white p-4 rounded-2xl shadow-xl shadow-blue-100/50 border border-blue-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="From: City or Airport"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="To: City or Airport"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? 'Searching...' : 'Search Flights'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

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