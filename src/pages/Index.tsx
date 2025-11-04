import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Zap } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Mini-Test</span>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="ghost">
                <Link to="/join">Join Quiz</Link>
              </Button>
              <Button asChild>
                <Link to="/teacher/login">Teacher Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-hero bg-clip-text text-white lg:text-7xl text-center">
            Interactive Live Quizzes
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Create engaging quizzes and watch students compete in real-time. Make learning fun and interactive!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild variant="hero" size="lg" className="text-lg px-8">
              <Link to="/teacher/login">Create a Quiz</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/join">Join a Quiz</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4 p-6 rounded-lg bg-card shadow-soft animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Real-Time Interaction</h3>
            <p className="text-muted-foreground">
              Students answer questions live and see results instantly
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg bg-card shadow-soft animate-slide-up" style={{
          animationDelay: "0.1s"
        }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Live Leaderboards</h3>
            <p className="text-muted-foreground">
              Track performance with dynamic rankings and scores
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg bg-card shadow-soft animate-slide-up" style={{
          animationDelay: "0.2s"
        }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Easy to Use</h3>
            <p className="text-muted-foreground">
              Simple interface for teachers and students alike
            </p>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;