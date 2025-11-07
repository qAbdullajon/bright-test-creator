import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherProfile from "./pages/TeacherProfile";
import TeacherStudents from "./pages/TeacherStudents";
import TeacherArchives from "./pages/TeacherArchives";
import CreateQuiz from "./pages/CreateQuiz";
import LiveQuiz from "./pages/LiveQuiz";
import JoinQuiz from "./pages/JoinQuiz";
import Layout from "./pages/Layout";

const queryClient = new QueryClient();

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/teacher" element={<Layout />}>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="archives" element={<TeacherArchives />} />
        <Route path="create-quiz" element={<CreateQuiz />} />
        <Route path="edit-quiz/:id" element={<CreateQuiz />} />
        <Route path="dashboard/:id" element={<LiveQuiz />} />
      </Route>

      <Route path="/join" element={<JoinQuiz />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="bottom-right" richColors />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
