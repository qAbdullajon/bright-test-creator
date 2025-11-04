import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CreateQuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (question: {
    text: string;
    options: string[];
    correctAnswer: number;
  }) => void;
}

export const CreateQuestionModal = ({ open, onOpenChange, onSave }: CreateQuestionModalProps) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("0");

  const handleSave = () => {
    if (!questionText.trim() || options.some((opt) => !opt.trim())) {
      return;
    }

    onSave({
      text: questionText,
      options,
      correctAnswer: parseInt(correctAnswer),
    });

    // Reset form
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("0");
    onOpenChange(false);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question Text</Label>
            <Input
              id="question"
              placeholder="Enter your question..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Answer Options</Label>
            <RadioGroup value={correctAnswer} onValueChange={setCorrectAnswer}>
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <RadioGroupItem value={String(index)} id={`option-${index}`} />
                  <Input
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1"
                  />
                </div>
              ))}
            </RadioGroup>
            <p className="text-xs text-muted-foreground">Select the correct answer</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Question</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
