import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components/QuizCard";
import { Sparkles, Plus, LogOut, LayoutDashboard, User, Settings, Users, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quizzes] = useState([
    { id: 1, title: "Mathematics Quiz 1", status: "draft" as const, questions: 10, type: "individual" as const },
    { id: 2, title: "Science Basics", status: "live" as const, questions: 15, participants: 24, type: "team" as const },
    { id: 3, title: "History Challenge", status: "finished" as const, questions: 12, type: "individual" as const },
    { id: 4, title: "Geography Test", status: "draft" as const, questions: 8, type: "team" as const },
  ]);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/teacher/dashboard" },
    { icon: User, label: "Profile", path: "/teacher/profile" },
    { icon: Settings, label: "Administration", path: "/teacher/administration" },
    { icon: Users, label: "Students", path: "/teacher/students" },
    { icon: Archive, label: "Archives", path: "/teacher/archives" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Mini-Test</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
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

        {/* Quiz Grid */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
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
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
