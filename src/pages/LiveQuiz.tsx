import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionCard } from "@/components/QuestionCard";
import { Leaderboard } from "@/components/Leaderboard";
import { ProgressBar } from "@/components/ProgressBar";
import { Sparkles, ArrowLeft, SkipForward, StopCircle, ArrowLeftToLine, CirclePlay, Radio, CircleStop, Clock } from "lucide-react";
import { Quiz, useQuiz } from "@/hooks/use-question";
import { StartDialog } from "@/components/Dialog";
import { toast } from "sonner";
import { $api } from "@/http/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});


interface Params {
  id: string
}
const mockLeaderboard = [
  { name: "Alice", score: 36 },
  { name: "Bob", score: 40 },
  { name: "Charlie", score: 50 },
  { name: "Diana", score: 55 },
  { name: "Eve", score: 60 },
];

const LiveQuiz = () => {
  const params = useParams()
  const { getQuery } = useQuiz()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [open, setOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  };
  const handlePrevQuestion = () => {
    if (currentQuestionIndex !== 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleStart = async (data: { duration: number, maxParticipants: number }) => {
    try {
      const res = await $api.post(`/quiz/${quiz.id}/start`, data)
      if (res.status === 200) {
        setOpen(false)
        const { roomCode, status, duration, maxParticipants } = res.data.quiz
        setQuiz((prev) => ({ ...prev, roomCode, status, duration, maxParticipants }))
        socket.emit("createRoom", { quizId: quiz?.id, roomCode });
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Noma'lum xatolik yuz berdi";
      toast.error('Xatolik', { description: message })
    }
  }

  const handleLive = async () => {
    try {
      socket.emit("goLive", { code: quiz.roomCode });
      toast.success("Quiz boshlandi!");
      setQuiz((prev) => prev && { ...prev, status: "active", participants: [] });
    } catch (error) {
      toast.error("Xatolik", { description: "Quizni boshlashda muammo" });
    }

  }

  const handleFinish = () => {
    // navigate("/teacher/dashboard");
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    if (getQuery.data) {
      const quizData = getQuery.data.find(a => a.id === Number(params.id));
      if (quizData) {
        setQuiz(quizData);
        setTotalQuestions(quizData.questions.length);
      }
    }
  }, [getQuery.data]);

  useEffect(() => {
    if (!quiz?.roomCode) return;

    socket.emit("joinQuiz", { code: quiz.roomCode, teacher: true });

    socket.on("newParticipant", ({ participants }) => {
      setQuiz((prev) => prev && ({ ...prev, participants }));
    });

    socket.on("participantLeft", (participants) => {
      setQuiz((prev) => prev && ({ ...prev, participants }));
    });
    socket.on("timerUpdate", ({ timeLeft }) => {
      setTimeLeft(timeLeft);
    });
    socket.on("quizFinished", ({ answers }) => {
      setQuiz((prev) => ({ ...prev, status: 'draft' }))
    });

    return () => {
      socket.off("newParticipant");
      socket.off("participantLeft");
    };
  }, [quiz?.roomCode]);

  if (getQuery.isLoading || !quiz) return <p>⏳ Ma’lumot yuklanmoqda...</p>;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <StartDialog open={open} onClose={() => setOpen(false)} onSubmit={handleStart} />

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header with Room Code */}
          {
            (quiz.status == "active" || quiz.status === 'waiting') && (
              <Card className="shadow-medium gradient-hero animate-scale-in">
                <CardContent className="p-8 text-center text-white space-y-3">
                  <p className="text-sm font-medium">Room Code</p>
                  <h1 className="text-6xl font-bold tracking-wider">{quiz.roomCode}</h1>
                  <p className="text-sm opacity-90">{quiz.maxParticipants} participants joined</p>

                  {quiz.status == "active" && (
                    <div className="flex justify-center items-center gap-2 text-lg font-semibold mt-4">
                      <Clock className="w-5 h-5" />
                      <span>
                        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          }

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Question Progress</span>
              <span className="text-muted-foreground">
                {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
            <ProgressBar progress={progress} />
          </div>

          {/* Main Content Grid */}
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6`}>
            {/* Main Question Area */}
            <div className={`${quiz.participants.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
              <QuestionCard
                question={quiz.questions[currentQuestionIndex].text}
                options={quiz.questions[currentQuestionIndex].options}
                disabled
                showCorrect
                correctAnswer={quiz.questions[currentQuestionIndex].correctIndex}
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex flex-1 gap-3">
                  <Button
                    disabled={currentQuestionIndex == 0}
                    onClick={handlePrevQuestion}
                    size="lg"
                    className="flex-1"
                  >
                    <ArrowLeftToLine className="h-5 w-5 mr-2" />
                    Prev Question
                  </Button>
                  <Button
                    disabled={currentQuestionIndex == quiz.questions.length - 1}
                    onClick={handleNextQuestion}
                    size="lg"
                    className="flex-1"
                  >
                    <SkipForward className="h-5 w-5 mr-2" />
                    Next Question
                  </Button>
                </div>

                <div className="flex justify-center sm:justify-end flex-1">
                  {quiz.status === 'draft' && (
                    <Button onClick={() => setOpen(true)} variant="outline" size="lg">
                      <CirclePlay className="h-5 w-5 mr-2" />
                      Start Quiz
                    </Button>
                  )}
                  {quiz.status === 'waiting' && (
                    <Button onClick={handleLive} variant="success" size="lg">
                      <Radio className="h-5 w-5 mr-2" />
                      Go Live
                    </Button>
                  )}
                  {quiz.status === 'active' && (
                    <Button onClick={handleFinish} variant="destructive" size="lg">
                      <CircleStop className="h-5 w-5 mr-2" />
                      Stop Quiz
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            {quiz.status !== "draft" && quiz.participants.length > 0 && (
              <div className="lg:col-span-1">
                <Leaderboard entries={quiz.participants} type="join" />
              </div>
            )}
          </div>

        </div>
      </div>
    </div >
  );
};

export default LiveQuiz;



