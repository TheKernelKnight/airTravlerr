import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { value: '64%', label: 'Average Savings' },
    { value: '500+', label: 'Airlines Partnered' },
    { value: '10K+', label: 'Happy Travelers' },
    { value: '4.9/5', label: 'User Rating' }
  ];

  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;