"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface EnergyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  loading?: boolean;
}

const EnergyButton = forwardRef<HTMLButtonElement, EnergyButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      disabled,
      loading,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-2.5 text-sm gap-2",
      lg: "px-8 py-3 text-base gap-2",
    };

    const variantClasses = {
      primary: cn(
        "bg-gradient-to-r from-[#a855f7] to-[#7e22ce]",
        "text-white font-semibold",
        "hover:shadow-[0_0_24px_rgba(168,85,247,0.5)]",
        "active:scale-[0.97]"
      ),
      ghost: cn(
        "bg-transparent",
        "text-[#7e22ce] font-semibold",
        "border border-[rgba(126,34,206,0.35)]",
        "hover:bg-[rgba(168,85,247,0.06)]",
        "hover:border-[rgba(168,85,247,0.5)]"
      ),
      icon: cn(
        "bg-[rgba(168,85,247,0.08)]",
        "text-[#6900b3]",
        "hover:bg-[rgba(168,85,247,0.16)]",
        "!px-2.5 !py-2.5"
      ),
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && !loading ? { scale: 1.03 } : undefined}
        whileTap={!disabled && !loading ? { scale: 0.97 } : undefined}
        aria-label={ariaLabel}
        aria-disabled={disabled || loading}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center",
          "rounded-full font-medium",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...(props as object)}
      >
        
        {variant === "primary" && !disabled && !loading && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#a855f7] to-[#7e22ce]"
            initial={{ opacity: 0, scale: 1 }}
            whileHover={{ opacity: 0.25, scale: 1.15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}

        {loading ? (
          <span
            aria-hidden="true"
            className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
          />
        ) : (
          <span className="relative z-10 flex items-center gap-inherit">
            {children}
          </span>
        )}
      </motion.button>
    );
  }
);

EnergyButton.displayName = "EnergyButton";
export default EnergyButton;
