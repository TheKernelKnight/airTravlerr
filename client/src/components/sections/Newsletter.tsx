import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-10 md:p-14 text-center shadow-2xl shadow-blue-200/50">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss a Deal
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Subscribe to get exclusive fare alerts and travel tips delivered to your inbox weekly.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {isSubscribed && (
            <div className="mt-4 text-white font-medium animate-fade-in">
              Thank you for subscribing! Check your inbox.
            </div>
          )}

          <p className="text-blue-200 text-sm mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;