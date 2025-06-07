
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const subtitleSizes = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm'
  };

  return (
    <div className={`text-center ${className}`}>
      <h1 className={`${sizeClasses[size]} font-black text-gray-800 tracking-wide`}>
        BAL - RAKSHAK
      </h1>
      <p className={`${subtitleSizes[size]} text-gray-600 font-medium`}>
        Baby Health Guardian
      </p>
    </div>
  );
};

export default Logo;
