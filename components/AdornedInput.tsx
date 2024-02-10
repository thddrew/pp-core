import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";

export interface AdornedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const AdornedInput = forwardRef<HTMLInputElement, AdornedInputProps>(
  ({ startAdornment, endAdornment, className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 w-full space-x-1 rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}>
        {startAdornment}
        <input className="ml-2 w-full bg-transparent outline-none" type={type} ref={ref} {...props} />
        {endAdornment}
      </div>
    );
  }
);
AdornedInput.displayName = "Adorned Input";
