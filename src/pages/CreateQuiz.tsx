import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CreateQuestionModal } from "@/components/CreateQuestionModal";
import { Sparkles, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useQuiz } from "@/hooks/use-question";

interface Question {
  id?: number;
  text: string;
  options: string[];
  correctIndex: number;
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addMutation, getQuery } = useQuiz()
  const handleAddQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSaveQuiz = () => {
    addMutation.mutate({ title: quizTitle, questions })
    navigate("/teacher/dashboard");
  };

  useEffect(() => {
    if (getQuery.data && params.id) {
      const { title, questions } = getQuery.data.find(a => a.id == params.id)
      setQuizTitle(title)
      setQuestions(questions)
    }
  }, [getQuery.data])

  if (getQuery.isLoading) return <p>⏳ Ma’lumot yuklanmoqda...</p>

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
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold">{params.id ? 'Update Quiz' : 'Create Quiz'}</h1>
            <p className="text-muted-foreground mt-2">Design your interactive quiz</p>
          </div>

          {/* Quiz Setup */}
          <Card className="shadow-soft">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  placeholder="Mathematics Quiz 1"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="text-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Questions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Questions ({questions.length})</h2>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            {questions.length === 0 ? (
              <Card className="shadow-soft">
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground text-lg">No questions yet. Start by adding your first question!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <Card key={index} className="shadow-soft animate-fade-in">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <span className="font-bold text-primary">{index + 1}.</span>
                            <p className="font-medium">{question.text}</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-6">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-2 rounded text-sm ${optIndex === question.correctIndex
                                  ? "bg-success/10 text-success font-medium"
                                  : "bg-muted"
                                  }`}
                              >
                                {String.fromCharCode(65 + optIndex)}. {option}
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteQuestion(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" asChild>
              <Link to="/teacher/dashboard">Cancel</Link>
            </Button>
            <Button onClick={handleSaveQuiz} size="lg">
              Save Quiz
            </Button>
          </div>
        </div>
      </div>

      <CreateQuestionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleAddQuestion}
      />
    </div>
  );
};

export default CreateQuiz;
