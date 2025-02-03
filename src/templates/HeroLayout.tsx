import React from "react";
import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { Title } from "../ui/Title";

interface HeroLayoutProps {
  title: string;
  subtitle?: string;
  image?: string;
  children: React.ReactNode;
  align?: "left" | "center";
  overlay?: boolean;
}

export function HeroLayout({
  title,
  subtitle,
  image,
  children,
  align = "left",
  overlay = false,
}: HeroLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        {image && (
          <div className="absolute inset-0">
            <img
              draggable="false"
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            {overlay && <div className="absolute inset-0 bg-black/50" />}
          </div>
        )}
        <div className="relative h-full notion-page flex items-center">
          <motion.div
            className={`max-w-2xl space-y-6 ${
              align === "center" ? "mx-auto text-center" : ""
            } ${image ? "text-white" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Title>{title}</Title>
            {subtitle && <p className="text-xl opacity-90">{subtitle}</p>}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="notion-page py-16">
        <Section>{children}</Section>
      </div>
    </div>
  );
}
