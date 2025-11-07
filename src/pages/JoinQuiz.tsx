import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Trophy } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { Answer, Leaderboard } from "@/components/Leaderboard";
import { QuestionCard } from "@/components/QuestionCard";
import { Timer } from "@/components/Timer";
import { Link } from "react-router-dom";

let socket: Socket;

interface Participant {
  id: number;
  quizId: string;
  name: string;
  score: number;
  joinedAt: string;
  finishedAt?: string;
  answers: Answer[];
}

const QuizPage = () => {
  const [state, setState] = useState<'join' | 'waiting' | 'active' | 'result'>('join');
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [showCorrect, setShowCorrect] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentParticipant, setCurrentParticipant] = useState<Participant>();
  const [timeLeft, setTimeLeft] = useState(0);
  const [duration, setDuration] = useState<number>(0);
  const [questions, setQuestions] = useState<any[]>([]);

  // Ref to avoid stale state inside socket listener
  const currentRef = useRef<Participant | undefined>(currentParticipant);
  useEffect(() => {
    currentRef.current = currentParticipant;
  }, [currentParticipant]);

  useEffect(() => {
    socket = io("http://localhost:4000");

    // new participant joined
    socket.on("newParticipant", (data: any) => {
      setParticipants(data.participants);
      const current = data.participants.find((p: Participant) => p.name === name);
      setCurrentParticipant(current);
      setState('waiting');
      if (data.quiz.status === "active") {
        setQuestions(data.quiz.questions);
        setState('active');
      }
    });

    // quiz started
    socket.on("quizStarted", (quiz: any) => {
      setTimeLeft(quiz.duration);
      setDuration(quiz.duration);
      setQuestions(quiz.questions);
      setState("active");

      if (name && roomCode) {
        socket.emit("joinQuiz", { code: roomCode, name });
      }
    });

    // quiz finished
    socket.on("quizFinished", (finishedQuiz: any) => {
      setState('result');
    });

    // timer update
    socket.on("timerUpdate", ({ timeLeft }) => setTimeLeft(timeLeft));

    // update leaderboard
    socket.on("updateLeaderboard", (updatedParticipants: Participant[]) => {
      const updatedCurrent = updatedParticipants.find(p => p.id === currentRef.current?.id);
      setCurrentParticipant(updatedCurrent);
      setParticipants(updatedParticipants);
    });

    return () => {
      socket.disconnect();
    };
  }, [name, roomCode]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode || !name) return;
    socket.emit("joinQuiz", { code: roomCode, name });
  };

  const handleSelectAnswer = (index: number) => {
    if (showCorrect || !currentParticipant) return;

    setSelectedAnswer(index);
    setShowCorrect(true);

    socket.emit("submitAnswer", {
      participantId: currentParticipant.id,
      questionId: questions[currentQuestionIndex].id,
      selectedIndex: index,
    });

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(undefined);
        setShowCorrect(false);
      } else {
        socket.emit("finishQuiz", {
          participantId: currentParticipant.id,
          quizCode: roomCode,
        });
        setState("result");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b">
        <Link to="/" className="container mx-auto px-4 py-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Mini-Test</span>
        </Link>
      </nav>

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Join Screen */}
        {state === "join" && (
          <div className="max-w-md mx-auto">
            <Card className="shadow-medium animate-scale-in">
              <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold text-center">Join a Quiz</CardTitle>
                <CardDescription className="text-center">
                  Enter the room code provided by your teacher
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJoin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Room Code</Label>
                    <Input
                      id="code"
                      placeholder="1234"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      className="text-center text-2xl font-bold tracking-wider"
                      maxLength={6}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Join Quiz
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Waiting Screen */}
        {state === "waiting" && (
          <div className="max-w-md mx-auto mt-10">
            <Leaderboard entries={participants} type="join" />
          </div>
        )}

        {/* Active Quiz */}
        {state === "active" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Timer timeLeft={timeLeft} duration={duration} />
            <QuestionCard
              question={questions[currentQuestionIndex]?.text}
              options={questions[currentQuestionIndex]?.options}
              selectedAnswer={selectedAnswer}
              correctAnswer={questions[currentQuestionIndex]?.correctIndex}
              onSelectAnswer={handleSelectAnswer}
              disabled={showCorrect}
              showCorrect={showCorrect}
            />
          </div>
        )}

        {/* Result Screen */}
        {state === "result" && currentParticipant && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="shadow-strong gradient-hero text-center text-white p-12">
              <Trophy className="h-20 w-20 mx-auto" />
              <h1 className="text-4xl font-bold">Quiz Complete!</h1>
              <p className="text-xl font-semibold">
                Your Score: {currentParticipant.score}
              </p>
            </Card>
            <Leaderboard entries={participants} highlightName={currentParticipant.name} type="result" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
