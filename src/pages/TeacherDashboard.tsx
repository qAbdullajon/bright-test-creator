import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components/QuizCard";
import { useQuiz } from "@/hooks/use-question";
import { Plus } from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { getQuery } = useQuiz()

  if (getQuery.isLoading) return <p>⏳ Ma’lumot yuklanmoqda...</p>;

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card p-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">My Quizzes</h1>
              <p className="text-muted-foreground mt-1">Manage and create your interactive quizzes</p>
            </div>
            <Button size="lg" asChild>
              <Link to="/teacher/create-quiz">
                <Plus className="h-5 w-5 mr-2" />
                New Quiz
              </Link>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getQuery.data.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quizId={quiz.id}
                  title={quiz.title}
                  status={quiz.status}
                  questions={quiz.questions.length}
                  participants={quiz.participants.length}
                  questionLength={quiz.questions.length}
                  onManage={() => {
                    navigate(`/teacher/dashboard/${quiz.id}`);
                  }}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
