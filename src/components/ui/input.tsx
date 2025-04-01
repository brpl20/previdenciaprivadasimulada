// src/components/ui/input.tsx
// components/ui/input.tsx

import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ type, name, placeholder, required, disabled, className }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] ${className}`}
    />
  );
};
