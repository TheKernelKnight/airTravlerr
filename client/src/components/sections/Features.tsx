import React from 'react';
import { Search, Mail, Link, TrendingUp, Shield, Globe, Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Flight Search',
      description: 'Enter your dates and destination to discover hidden consolidator fares others can\'t see.',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Instant Email Alerts',
      description: 'Receive private fare links directly in your inbox. No waiting, no searching required.',
      color: 'indigo'
    },
    {
      icon: Link,
      title: 'Exclusive Booking Links',
      description: 'Access discounted fares through private links. Book online or with our travel agents.',
      color: 'purple'
    },
    {
      icon: TrendingUp,
      title: 'Last-Minute Savings',
      description: 'Save big on last-minute trips and business class. Our steepest discounts are just days away.',
      color: 'pink'
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your data is protected. We never share your information with third parties.',
      color: 'green'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access deals on 500+ airlines across 200+ countries worldwide.',
      color: 'teal'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    purple: 'bg-purple-50 text-purple-600',
    pink: 'bg-pink-50 text-pink-600',
    green: 'bg-green-50 text-green-600',
    teal: 'bg-teal-50 text-teal-600'
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Why Choose AirTravelerr</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Airlines save discounted seats for every flight
          </h2>
          <p className="text-lg text-gray-600">
            Access "consolidator" fares that airlines don't advertise. Save thousands on business and first-class travel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-10 md:p-14 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to save on your next flight?
            </h3>
            <p className="text-blue-100 mb-8">
              Join thousands of savvy travelers who are already saving up to 64% on premium flights.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all transform hover:scale-105">
              Start Saving Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;