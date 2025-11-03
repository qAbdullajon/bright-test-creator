import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components/QuizCard";
import { Sparkles, Plus, LogOut } from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [quizzes] = useState([
    { id: 1, title: "Mathematics Quiz 1", status: "draft" as const, questions: 10 },
    { id: 2, title: "Science Basics", status: "live" as const, questions: 15, participants: 24 },
    { id: 3, title: "History Challenge", status: "finished" as const, questions: 12 },
    { id: 4, title: "Geography Test", status: "draft" as const, questions: 8 },
  ]);

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
              <Link to="/">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold">My Quizzes</h1>
              <p className="text-muted-foreground mt-2">Manage and create your interactive quizzes</p>
            </div>
            <Button asChild size="lg">
              <Link to="/teacher/create-quiz">
                <Plus className="h-5 w-5 mr-2" />
                New Quiz
              </Link>
            </Button>
          </div>

          {/* Quiz Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                status={quiz.status}
                questions={quiz.questions}
                participants={quiz.participants}
                onManage={() => {
                  if (quiz.status === "live") {
                    navigate("/teacher/live-quiz");
                  } else {
                    navigate("/teacher/create-quiz");
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
