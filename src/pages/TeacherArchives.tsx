import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TeacherArchives = () => {

  const archivedQuizzes = [
    { id: 1, title: "Physics Final Exam", date: "2024-01-15", participants: 45, avgScore: 82 },
    { id: 2, title: "Chemistry Midterm", date: "2024-01-10", participants: 38, avgScore: 76 },
    { id: 3, title: "Biology Quiz 3", date: "2024-01-05", participants: 42, avgScore: 88 },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Archives</h1>
            <p className="text-muted-foreground mt-1">View completed and archived quizzes</p>
          </div>

          <div className="space-y-4">
            {archivedQuizzes.map((quiz) => (
              <Card key={quiz.id} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">{quiz.title}</h3>
                        <Badge variant="secondary">Archived</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Completed on {quiz.date}</p>
                      <div className="flex gap-4 text-sm">
                        <span><strong>{quiz.participants}</strong> participants</span>
                        <span><strong>{quiz.avgScore}%</strong> average score</span>
                      </div>
                    </div>
                    <Button variant="outline">View Results</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherArchives;
