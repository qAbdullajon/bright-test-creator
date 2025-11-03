import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const JoinQuiz = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock join - in real app, this would connect to quiz room
    navigate("/quiz-room");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Mini-Test</span>
          </Link>
        </div>
      </nav>

      {/* Join Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-medium animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">Join a Quiz</CardTitle>
            <CardDescription className="text-center">
              Enter the room code provided by your teacher
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Room Code</Label>
                <Input
                  id="code"
                  placeholder="e.g., ABC123"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  className="text-center text-2xl font-bold tracking-wider"
                  maxLength={6}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Join Quiz
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JoinQuiz;
