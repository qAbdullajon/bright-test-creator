import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaderboard } from "@/components/Leaderboard";
import { Sparkles, Trophy } from "lucide-react";

const Results = () => {
  const playerName = "You";
  const playerScore = 720;

  const mockLeaderboard = [
    { name: "Alice", score: 850, rank: 1 },
    { name: playerName, score: playerScore, rank: 2 },
    { name: "Charlie", score: 690, rank: 3 },
    { name: "Diana", score: 580, rank: 4 },
    { name: "Eve", score: 520, rank: 5 },
  ];

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // @ts-ignore
      if (typeof confetti !== "undefined") {
        // @ts-ignore
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        // @ts-ignore
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

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
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Celebration Card */}
          <Card className="shadow-strong gradient-hero animate-scale-in">
            <CardContent className="p-12 text-center text-white space-y-4">
              <Trophy className="h-20 w-20 mx-auto" />
              <h1 className="text-4xl font-bold">Quiz Complete!</h1>
              <div className="space-y-2">
                <p className="text-xl font-semibold">Your Score</p>
                <p className="text-6xl font-bold">{playerScore}</p>
                <p className="text-lg opacity-90">You ranked #{mockLeaderboard.find(e => e.name === playerName)?.rank}!</p>
              </div>
            </CardContent>
          </Card>

          {/* Final Leaderboard */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Leaderboard entries={mockLeaderboard} highlightName={playerName} />
          </div>

          {/* Actions */}
          <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button asChild variant="outline" className="flex-1" size="lg">
              <Link to="/join">Join Another Quiz</Link>
            </Button>
            <Button asChild className="flex-1" size="lg">
              <Link to="/">Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
