import React from 'react';
import { cn } from '../utils/cn';

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

interface TimelineItemProps {
  children: React.ReactNode;
  date: string;
  title: string;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-notion-gray-light" />
      <div className="space-y-12">{children}</div>
    </div>
  );
}

export function TimelineItem({ children, date, title, className }: TimelineItemProps) {
  return (
    <div className={cn('relative pl-8', className)}>
      <div className="absolute left-[-5px] top-2 h-3 w-3 rounded-full border-2 border-notion-DEFAULT bg-white" />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-notion-DEFAULT">{title}</h3>
          <time className="text-sm text-notion-gray-dark">{date}</time>
        </div>
        <div className="text-notion-gray-dark">{children}</div>
      </div>
    </div>
  );
}