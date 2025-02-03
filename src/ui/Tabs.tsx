import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

interface Tab {
  id: string;
  label: React.ReactNode;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="relative border-b border-notion-gray-light">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-notion-DEFAULT"
                  : "text-notion-gray-dark hover:text-notion-DEFAULT"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                  layoutId="activeTab"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {activeContent && (
        <div className="mt-6">
          {activeContent}
        </div>
      )}
    </div>
  );
}