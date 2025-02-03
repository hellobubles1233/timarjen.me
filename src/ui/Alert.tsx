import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '../utils/cn';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

const alertVariants = {
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  error: 'bg-red-50 text-red-700 border-red-200'
};

export function Alert({ children, variant = 'info', className }: AlertProps) {
  const Icon = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle
  }[variant];

  return (
    <div className={cn('flex items-start p-4 rounded-lg border', alertVariants[variant], className)}>
      <Icon className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
}