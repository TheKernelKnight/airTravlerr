import React from 'react';
import { Search, UserCheck, Plane } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search Flights',
      description: 'Enter your travel dates and destination. Click "Search Flights" to discover hidden deals.',
      step: '01'
    },
    {
      icon: UserCheck,
      title: 'Enter Contact Info',
      description: 'Add your preferred contact method. We\'ll send you personalized booking assistance.',
      step: '02'
    },
    {
      icon: Plane,
      title: 'Receive Booking Link',
      description: 'Get your discounted fares through a private link. Book online or with our travel agent.',
      step: '03'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            So easy, anyone can do it
          </h2>
          <p className="text-lg text-gray-600">
            Save thousands in just 3 simple steps. No complex procedures, no hidden fees.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-blue-200 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-3xl p-8 shadow-lg shadow-blue-100/30 border border-blue-50 relative z-10 hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-200">
                        {step.step}
                      </div>
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-10 border border-blue-100 shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                50% of fares can be booked online instantly
              </h4>
              <p className="text-gray-600">
                The remaining fares require assistance from our dedicated travel agents. 
                We're here to help you get the best deal.
              </p>
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all whitespace-nowrap">
              Search Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;