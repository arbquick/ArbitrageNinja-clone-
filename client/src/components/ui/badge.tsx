import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary bg-opacity-20 text-primary",
        secondary: "bg-secondary bg-opacity-20 text-secondary",
        destructive: "bg-destructive bg-opacity-20 text-destructive",
        outline: "text-foreground border border-input",
        purple: "bg-accent-purple/20 text-accent-purple",
        teal: "bg-accent-teal/20 text-accent-teal",
        green: "bg-green-500/20 text-green-500",
        yellow: "bg-yellow-500/20 text-yellow-500",
        red: "bg-red-500/20 text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
