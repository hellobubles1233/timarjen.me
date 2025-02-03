import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";

interface NavItem {
  title: string;
  href: string;
  badge?: {
    text: string;
    variant?: keyof typeof badgeVariants;
  };
  subitems?: NavItem[];
}

interface NavigationProps {
  items: NavItem[];
}

const badgeVariants = {
  default: "bg-badge-gray-bg text-badge-gray-text",
  gray: "bg-badge-gray-bg text-badge-gray-text",
  green: "bg-badge-green-bg text-badge-green-text",
  blue: "bg-badge-blue-bg text-badge-blue-text",
};

export function Navigation({ items }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled
          ? "bg-white/80 backdrop-blur-sm border-b border-notion-gray-light"
          : "bg-transparent"
      )}
    >
      <div className="notion-page">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center space-x-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {" "}
            <div className="logo">
              <h1>
                <img
                  src="src/assets/TL-Mark.svg"
                  alt="TL"
                  className="w-8"
                  draggable="false"
                />
              </h1>
            </div>
            {items.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                isActive={location.pathname === item.href}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (item.subitems) {
      setIsOpen(!isOpen);
      return;
    }

    if (item.href.startsWith("#")) {
      // For About link, navigate to home page
      navigate("/");
    } else {
      navigate(item.href);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className={cn(
          "inline-flex items-center space-x-1 text-sm font-medium transition-colors",
          isActive
            ? "text-notion-DEFAULT"
            : "text-notion-gray-dark hover:text-notion-DEFAULT"
        )}
      >
        <span>{item.title}</span>
        {item.badge && (
          <span
            className={cn(
              "inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium",
              badgeVariants[item.badge.variant || "default"]
            )}
          >
            {item.badge.text}
          </span>
        )}
        {item.subitems && (
          <ChevronDown
            size={14}
            className={cn(
              "transition-transform",
              isOpen && "transform rotate-180"
            )}
          />
        )}
      </button>

      {isOpen && item.subitems && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            {item.subitems.map((subitem) => (
              <Link
                key={subitem.title}
                to={subitem.href}
                className="block px-4 py-2 text-sm text-notion-gray-dark hover:bg-notion-gray-light"
                onClick={() => setIsOpen(false)}
              >
                {subitem.title}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
