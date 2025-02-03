import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={14} className="text-notion-gray-dark" />}
          {item.href ? (
            <a
              href={item.href}
              className="text-notion-gray-dark hover:text-notion-default transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-notion-default font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}