import React from 'react';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function Section({ children, title, subtitle, className, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn('py-16', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {(title || subtitle) && (
        <div className="space-y-2 mb-8">
          {title && <h2 className="text-3xl font-bold text-notion-DEFAULT">{title}</h2>}
          {subtitle && <p className="text-notion-gray-dark">{subtitle}</p>}
        </div>
      )}
      {children}
    </motion.section>
  );
}