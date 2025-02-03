import React from "react";
import { cn } from "../utils/cn";
import img from "../assets/a82e979e9d714a9d0af4bf9ffc2b876a.png";

interface AvatarProps {
  img: img;
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const avatarSizes = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

export function Avatar({ src, alt, size = "md", className }: AvatarProps) {
  return (
    <img
      draggable={false}
      src={img}
      alt={alt}
      className={cn("rounded-full object-cover", avatarSizes[size], className)}
    />
  );
}
