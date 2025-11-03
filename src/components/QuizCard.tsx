import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

interface QuizCardProps {
  title: string;
  status: "draft" | "live" | "finished";
  participants?: number;
  questions?: number;
  onManage: () => void;
}

const statusConfig = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  live: { label: "Live", className: "bg-success text-success-foreground" },
  finished: { label: "Finished", className: "bg-secondary text-secondary-foreground" },
};

export const QuizCard = ({ title, status, participants = 0, questions = 0, onManage }: QuizCardProps) => {
  const statusInfo = statusConfig[status];

  return (
    <Card className="hover:shadow-medium transition-smooth animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{questions} questions</span>
          </div>
          {status === "live" && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{participants} joined</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onManage} className="w-full">
          Manage Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};
