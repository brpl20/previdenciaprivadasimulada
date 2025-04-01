// src/components/ui/card.tsx
// components/ui/card.tsx

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-4 py-2 border-b">{children}</div>;
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-4 py-2">{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-4 py-2 border-t text-xs text-gray-500">{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="text-xl font-semibold text-[#2F4F4F]">{children}</h2>;
};

export const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-sm text-gray-500">{children}</p>;
};
