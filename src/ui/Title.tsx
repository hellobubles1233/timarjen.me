import React from 'react';
import { cn } from '../utils/cn';

interface TitleProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

const titleVariants = {
  h1: 'text-4xl sm:text-5xl font-bold text-gray-900',
  h2: 'text-3xl sm:text-4xl font-semibold text-gray-900',
  h3: 'text-2xl font-semibold text-gray-900',
  h4: 'text-xl font-medium text-gray-900',
};

export function Title({ children, variant = 'h1', className }: TitleProps) {
  const Component = variant;
  
  return (
    <Component className={cn(titleVariants[variant], className)}>
      {children}
    </Component>
  );
}