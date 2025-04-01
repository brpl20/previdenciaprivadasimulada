// src/components/ui/use-toast.tsx
// components/ui/use-toast.tsx

import React, { useState } from "react";

interface ToastProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (toastData: ToastProps) => {
    setToast(toastData);
    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  return {
    toast,
    showToast,
  };
};
