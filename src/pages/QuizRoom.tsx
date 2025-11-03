import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { QuestionCard } from "@/components/QuestionCard";
import { Timer } from "@/components/Timer";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const QuizRoom = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [showCorrect, setShowCorrect] = useState(false);

  const mockQuestion = {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  };

  const handleSelectAnswer = (index: number) => {
    if (showCorrect) return;
    setSelectedAnswer(index);
    setShowCorrect(true);

    // Simulate moving to next question after delay
    setTimeout(() => {
      // In real app, would load next question or finish
      navigate("/results");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Mini-Test</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Timer */}
          <Card className="shadow-soft animate-fade-in">
            <CardContent className="p-6">
              <Timer duration={30} isActive={!showCorrect} />
            </CardContent>
          </Card>

          {/* Question */}
          <QuestionCard
            question={mockQuestion.question}
            options={mockQuestion.options}
            selectedAnswer={selectedAnswer}
            correctAnswer={mockQuestion.correctAnswer}
            onSelectAnswer={handleSelectAnswer}
            disabled={showCorrect}
            showCorrect={showCorrect}
          />

          {/* Question Progress */}
          <div className="text-center text-sm text-muted-foreground">
            Question 1 of 10
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizRoom;
