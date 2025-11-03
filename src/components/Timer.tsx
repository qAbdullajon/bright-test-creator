import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { Clock } from "lucide-react";

interface TimerProps {
  duration: number;
  onComplete?: () => void;
  isActive?: boolean;
}

export const Timer = ({ duration, onComplete, isActive = true }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 0.1));
    }, 100);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete, isActive]);

  const progress = (timeLeft / duration) * 100;
  const variant = progress > 50 ? "success" : progress > 20 ? "warning" : "primary";

  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Time Remaining</span>
        </div>
        <span className="font-bold tabular-nums">{Math.ceil(timeLeft)}s</span>
      </div>
      <ProgressBar progress={progress} variant={variant} />
    </div>
  );
};
