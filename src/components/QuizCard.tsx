import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { DialogModal } from "./Dialog";
import { useQuiz } from "@/hooks/use-question";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  quizId: number;
  title: string;
  status: "draft" | "waiting" | "active" | "finished";
  participants?: number;
  questions?: number;
  questionLength: number;
  onManage: () => void;
}

const statusConfig = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  waiting: { label: "Waiting", className: "bg-secondary text-secondary-foreground" },
  active: { label: "Active", className: "bg-success text-success-foreground" },
  finished: { label: "Finished", className: "bg-secondary text-secondary-foreground" },
};

export const QuizCard = ({
  quizId,
  title,
  status,
  participants = 0,
  questions = 0,
  onManage,
  questionLength,
}: QuizCardProps) => {
  const [open, setOpen] = useState(false)
  const statusInfo = statusConfig[status];
  const navigate = useNavigate()
  const { deleteMutation } = useQuiz()

  const onEdit = () => {
    navigate(`/teacher/edit-quiz/${quizId}`)
  }

  const onDelete = () => {
    deleteMutation.mutate(quizId)
  }

  return (
    <Card className="hover:shadow-medium transition-smooth animate-fade-in group relative">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
        </div>

        {/* Edit va Delete ikonalar */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-card">
          <button
            onClick={onEdit}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-destructive transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>

      <DialogModal open={open} onClose={() => setOpen(false)} onSubmit={onDelete} />

      <CardContent>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{questions} questions</span>
          </div>
          {status === "active" && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{participants} joined</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          disabled={questionLength === 0}
          onClick={onManage}
          className="w-full"
        >
          Manage Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};
