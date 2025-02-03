import React from 'react';
import { cn } from '../utils/cn';

export const tagVariants = {
  default: 'bg-gray-100 text-gray-800',
  react: 'bg-blue-50 text-blue-600',
  typescript: 'bg-blue-100 text-blue-800',
  javascript: 'bg-yellow-100 text-yellow-800',
  node: 'bg-green-100 text-green-800',
  python: 'bg-blue-100 text-blue-800',
  design: 'bg-pink-100 text-pink-800',
  aws: 'bg-orange-100 text-orange-800',
  docker: 'bg-blue-100 text-blue-800',
  database: 'bg-purple-100 text-purple-800',
  api: 'bg-indigo-100 text-indigo-800'
};

interface TagProps {
  children: React.ReactNode;
  variant?: keyof typeof tagVariants;
  className?: string;
}

export function Tag({ children, variant = 'default', className }: TagProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium',
      tagVariants[variant],
      className
    )}>
      {children}
    </span>
  );
}