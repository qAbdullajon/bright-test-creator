import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Clapperboard } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Answer {
  answeredAt: string;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  joinedAt: string;
  finishedAt?: string; // natijalar uchun
  rank?: number;
  answers: Answer[];
  quiz?: { duration: number }; // duration qo'shdik
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  highlightName?: string;
  type: 'join' | 'result';
}

export const Leaderboard = ({ entries, highlightName, type }: LeaderboardProps) => {
  const sortedEntries = type === 'result'
    ? [...entries].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;

      const aHasAnswers = a.answers && a.answers.length > 0 && a.finishedAt;
      const bHasAnswers = b.answers && b.answers.length > 0 && b.finishedAt;

      if (aHasAnswers && bHasAnswers) {
        const aTime = new Date(a.finishedAt!).getTime() - new Date(a.answers[0].answeredAt).getTime();
        const bTime = new Date(b.finishedAt!).getTime() - new Date(b.answers[0].answeredAt).getTime();
        return aTime - bTime; // tez tugatgan tepada
      }
      return 0;
    })
    : entries;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-warning" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-muted-foreground" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-warning/60" />;
    return null;
  };

  const formatDuration = (start?: string, end?: string) => {
    if (!start || !end) return "-";
    const diffMs = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(diffMs / 1000 / 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clapperboard className="h-5 w-5" />
          {type === 'join' ? 'Waiting Students' : 'Results'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sortedEntries.map((entry, index) => {
            const lastAnswered = entry.answers?.[entry.answers.length - 1]?.answeredAt;

            // Javobsiz foydalanuvchi bo‘lsa durationni quiz.duration bilan hisoblash
            let durationDisplay = "-";
            if (entry.answers?.length > 0) {
              durationDisplay = formatDuration(entry.joinedAt, lastAnswered || entry.finishedAt);
            } else if (entry.quiz?.duration) {
              const minutes = Math.floor(entry.quiz.duration / 60);
              const seconds = Math.floor(entry.quiz.duration % 60);
              durationDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }

            return (
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
                  {type === 'result' && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-semibold text-sm">
                      {getRankIcon(index + 1) || index + 1}
                    </div>
                  )}
                  <span className="font-medium">{entry.name}</span>
                </div>

                {type === 'join' && (
                  <span className="text-sm text-muted-foreground">Joined</span>
                )}

                {type === 'result' && (
                  <span className="font-bold text-primary">
                    {entry.score} ta — {durationDisplay}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
