import React from 'react';
import { motion } from 'framer-motion';

interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
}

export function SidebarLayout({
  sidebar,
  children,
  sidebarPosition = 'left'
}: SidebarLayoutProps) {
  return (
    <div className="notion-page py-32">
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div 
          className={`lg:w-1/4 ${sidebarPosition === 'right' ? 'lg:order-2' : ''}`}
          initial={{ opacity: 0, x: sidebarPosition === 'right' ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {sidebar}
        </motion.div>
        <motion.main 
          className="lg:w-3/4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}