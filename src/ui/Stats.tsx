import React from 'react';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

interface StatsProps {
  items: {
    label: string;
    value: string | number;
    description?: string;
  }[];
  className?: string;
}

export function Stats({ items, className }: StatsProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-6', className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="text-3xl font-bold text-notion-DEFAULT">{item.value}</div>
          <div className="text-sm font-medium text-notion-gray-dark">{item.label}</div>
          {item.description && (
            <div className="text-xs text-notion-gray-dark">{item.description}</div>
          )}
        </motion.div>
      ))}
    </div>
  );
}