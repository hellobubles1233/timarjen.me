import React from "react";
import { cn } from "../utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  animation?: "pulse" | "wave" | "none";
}

export function Skeleton({
  className,
  variant = "text",
  animation = "pulse",
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-notion-gray-light rounded",
        {
          "h-4 w-full": variant === "text",
          "rounded-full": variant === "circular",
          "animate-pulse": animation === "pulse",
          "animate-shimmer": animation === "wave",
        },
        className
      )}
    />
  );
}
