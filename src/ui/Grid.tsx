import React from 'react';
import { cn } from '../utils/cn';

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
};

const gridGaps = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8'
};

export function Grid({ children, cols = 2, gap = 'md', className }: GridProps) {
  return (
    <div className={cn(
      'grid',
      gridCols[cols],
      gridGaps[gap],
      className
    )}>
      {children}
    </div>
  );
}