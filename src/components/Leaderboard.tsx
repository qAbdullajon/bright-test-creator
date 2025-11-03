import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  name: string;
  score: number;
  rank: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  highlightName?: string;
}

export const Leaderboard = ({ entries, highlightName }: LeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-warning" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-muted-foreground" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-warning/60" />;
    return null;
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.name}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-smooth",
                highlightName === entry.name
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-card hover:bg-secondary/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-semibold text-sm">
                  {getRankIcon(entry.rank) || entry.rank}
                </div>
                <span className="font-medium">{entry.name}</span>
              </div>
              <span className="font-bold text-primary">{entry.score} pts</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
