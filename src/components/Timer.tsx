import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface TimerProps {
  duration: number;
  timeLeft: number
}

export const Timer = ({ duration, timeLeft }: TimerProps) => {
  // const progress = (timeLeft / duration) * 100;
  // const variant = progress > 50 ? "success" : progress > 20 ? "warning" : "primary";

  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Time Remaining</span>
        </div>
        <span className="font-bold tabular-nums">{`${Math.floor(timeLeft / 60)}:${String(Math.floor(timeLeft % 60)).padStart(2, "0")}`}</span>
      </div>
      {/* <ProgressBar progress={progress} variant={variant} /> */}
    </div>
  );
};
