import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Users, PlayCircle, Copy, Check } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Participant {
  id: string;
  name: string;
  joinedAt: Date;
}

const QuizLobby = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isTeacher = searchParams.get("role") === "teacher";
  const [roomCode] = useState("ABC123");
  const [copied, setCopied] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "Alice Johnson", joinedAt: new Date() },
    { id: "2", name: "Bob Smith", joinedAt: new Date() },
    { id: "3", name: "Charlie Brown", joinedAt: new Date() },
  ]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartQuiz = () => {
    navigate("/teacher/live-quiz");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Mini-Test</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Room Code Card */}
          <Card className="shadow-medium gradient-hero animate-scale-in">
            <CardContent className="p-8 text-center text-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <p className="text-sm font-medium">Room Code</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <h1 className="text-6xl font-bold tracking-wider">{roomCode}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyRoomCode}
                  className="text-white hover:bg-white/20 h-10 w-10"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>
              <p className="text-sm mt-3 opacity-90">
                Share this code with participants to join
              </p>
            </CardContent>
          </Card>

          {/* Waiting Status */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Participants ({participants.length})</span>
                {isTeacher && (
                  <Button
                    onClick={handleStartQuiz}
                    size="lg"
                    disabled={participants.length === 0}
                  >
                    <PlayCircle className="h-5 w-5 mr-2" />
                    Start Quiz
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {participants.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">
                    Waiting for participants to join...
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors animate-fade-in"
                    >
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(participant.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined {participant.joinedAt.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    </div>
                  ))}
                </div>
              )}
              
              {!isTeacher && (
                <div className="mt-6 p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    Waiting for the teacher to start the quiz...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizLobby;
