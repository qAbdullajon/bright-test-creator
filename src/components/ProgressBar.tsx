import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  variant?: "primary" | "success" | "warning";
}

export const ProgressBar = ({ progress, className, variant = "primary" }: ProgressBarProps) => {
  const variantClasses = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
  };

  return (
    <div className={cn("w-full h-2 bg-secondary rounded-full overflow-hidden", className)}>
      <div
        className={cn(
          "h-full transition-all duration-300 ease-linear",
          variantClasses[variant]
        )}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};
