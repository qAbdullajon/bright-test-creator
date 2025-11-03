import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedAnswer?: number;
  correctAnswer?: number;
  onSelectAnswer?: (index: number) => void;
  disabled?: boolean;
  showCorrect?: boolean;
}

export const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  onSelectAnswer,
  disabled = false,
  showCorrect = false,
}: QuestionCardProps) => {
  const getButtonVariant = (index: number) => {
    if (!showCorrect && selectedAnswer !== index) return "outline";
    if (showCorrect && index === correctAnswer) return "success";
    if (showCorrect && selectedAnswer === index && selectedAnswer !== correctAnswer) return "destructive";
    return "default";
  };

  return (
    <Card className="shadow-medium animate-scale-in">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-2xl font-semibold">{question}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={getButtonVariant(index)}
              size="lg"
              className={cn(
                "h-auto min-h-[60px] text-base font-medium py-4 justify-start text-left whitespace-normal",
                disabled && "cursor-not-allowed"
              )}
              onClick={() => !disabled && onSelectAnswer?.(index)}
              disabled={disabled}
            >
              <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
