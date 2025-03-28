
import React from "react";
import { cn } from "@/lib/utils";
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends ShadcnButtonProps {
  hasArrow?: boolean;
  hasShine?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  hasArrow = false, 
  hasShine = false,
  className, 
  ...props 
}) => {
  return (
    <ShadcnButton
      className={cn(
        "transition-all duration-300 ease-in-out",
        hasShine && "btn-shine",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2">
        {children}
        {hasArrow && (
          <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </ShadcnButton>
  );
};
