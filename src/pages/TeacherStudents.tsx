import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, LogOut, LayoutDashboard, User, Settings, Users, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

const TeacherStudents = () => {
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/teacher/dashboard" },
    { icon: User, label: "Profile", path: "/teacher/profile" },
    { icon: Settings, label: "Administration", path: "/teacher/administration" },
    { icon: Users, label: "Students", path: "/teacher/students" },
    { icon: Archive, label: "Archives", path: "/teacher/archives" },
  ];

  const students = [
    { id: 1, name: "Alice Johnson", quizzesTaken: 12, avgScore: 85 },
    { id: 2, name: "Bob Smith", quizzesTaken: 10, avgScore: 78 },
    { id: 3, name: "Charlie Brown", quizzesTaken: 15, avgScore: 92 },
    { id: 4, name: "Diana Prince", quizzesTaken: 8, avgScore: 88 },
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
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Students</h1>
            <p className="text-muted-foreground mt-1">View and manage student performance</p>
          </div>

          <Card className="shadow-soft">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Quizzes Taken</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Average Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-accent/50 transition-colors">
                        <td className="px-6 py-4 font-medium">{student.name}</td>
                        <td className="px-6 py-4">{student.quizzesTaken}</td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-primary">{student.avgScore}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudents;
