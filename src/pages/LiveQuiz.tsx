import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionCard } from "@/components/QuestionCard";
import { Leaderboard } from "@/components/Leaderboard";
import { ProgressBar } from "@/components/ProgressBar";
import { Sparkles, ArrowLeft, SkipForward, StopCircle } from "lucide-react";

const LiveQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion] = useState(1);
  const [totalQuestions] = useState(10);
  const [roomCode] = useState("ABC123");

  const mockQuestion = {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  };

  const mockLeaderboard = [
    { name: "Alice", score: 850, rank: 1 },
    { name: "Bob", score: 720, rank: 2 },
    { name: "Charlie", score: 690, rank: 3 },
    { name: "Diana", score: 580, rank: 4 },
    { name: "Eve", score: 520, rank: 5 },
  ];

  const handleNextQuestion = () => {
    // In real app, advance to next question
  };

  const handleFinish = () => {
    navigate("/teacher/dashboard");
  };

  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Mini-Test</span>
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header with Room Code */}
          <Card className="shadow-medium gradient-hero animate-scale-in">
            <CardContent className="p-8 text-center text-white">
              <p className="text-sm font-medium mb-2">Room Code</p>
              <h1 className="text-6xl font-bold tracking-wider">{roomCode}</h1>
              <p className="text-sm mt-3 opacity-90">{mockLeaderboard.length} participants joined</p>
            </CardContent>
          </Card>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Question Progress</span>
              <span className="text-muted-foreground">
                {currentQuestion} of {totalQuestions}
              </span>
            </div>
            <ProgressBar progress={progress} />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Current Question */}
            <div className="lg:col-span-2 space-y-6">
              <QuestionCard
                question={mockQuestion.question}
                options={mockQuestion.options}
                disabled
                showCorrect
                correctAnswer={mockQuestion.correctAnswer}
              />

              {/* Controls */}
              <div className="flex gap-3">
                <Button onClick={handleNextQuestion} size="lg" className="flex-1">
                  <SkipForward className="h-5 w-5 mr-2" />
                  Next Question
                </Button>
                <Button onClick={handleFinish} variant="destructive" size="lg">
                  <StopCircle className="h-5 w-5 mr-2" />
                  Finish Quiz
                </Button>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="lg:col-span-1">
              <Leaderboard entries={mockLeaderboard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveQuiz;
