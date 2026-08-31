import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-gray-100 ${
        hover ? 'hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;