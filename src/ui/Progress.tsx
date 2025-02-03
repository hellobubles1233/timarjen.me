import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

const progressSizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

const progressVariants = {
  default: 'bg-notion-DEFAULT',
  success: 'bg-badge-green-text',
  warning: 'bg-badge-yellow-text',
  error: 'bg-badge-red-text'
};

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  variant = 'default',
  className
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-sm">
          {label && <span className="font-medium text-notion-DEFAULT">{label}</span>}
          {showValue && <span className="text-notion-gray-dark">{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className={cn('bg-notion-gray-light rounded-full overflow-hidden', progressSizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={cn('h-full rounded-full', progressVariants[variant])}
        />
      </div>
    </div>
  );
}