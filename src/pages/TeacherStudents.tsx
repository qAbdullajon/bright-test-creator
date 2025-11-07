import { Card, CardContent } from "@/components/ui/card";

const TeacherStudents = () => {

  const students = [
    { id: 1, name: "Alice Johnson", quizzesTaken: 12, avgScore: 85 },
    { id: 2, name: "Bob Smith", quizzesTaken: 10, avgScore: 78 },
    { id: 3, name: "Charlie Brown", quizzesTaken: 15, avgScore: 92 },
    { id: 4, name: "Diana Prince", quizzesTaken: 8, avgScore: 88 },
  ];

  return (
    <div className="min-h-screen bg-background flex">
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
