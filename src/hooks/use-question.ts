import { $api } from "@/http/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}
interface Participant {
  name: string;
  score: number;
  joinedAt: string;
  rank: number;
}
export interface Quiz {
  id: number;
  title: string;
  status: "draft" | "waiting" | "active" | "finished";
  participants: Participant[];
  roomCode: string;
  maxParticipants: number;
  questions: Question[];
}

interface QuizType {
  title: string;
  questions: Question[];
}

let questionData: any = [
  {
    id: 1,
    title: "Quiz 01",
    status: "waiting",
    questions: [
      {
        text: "Savol 01",
        options: ["A - variyant", "B - variyant", "C - variyant"],
        correctIndex: 0,
      },
      {
        text: "Savol 02",
        options: ["A - variyant", "B - variyant", "C - variyant"],
        correctIndex: 0,
      },
      {
        text: "Savol 03",
        options: ["A - variyant", "B - variyant", "C - variyant"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 2,
    title: "Quiz 02",
    status: "active",
    participants: 0,
    questions: [
      {
        text: "Savol 01",
        options: ["A - variyant", "B - variyant", "C - variyant"],
        correctIndex: 0,
      },
      {
        text: "Savol 02",
        options: ["A - variyant", "B - variyant", "C - variyant"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 3,
    title: "Quiz 03",
    status: "finished",
    questions: [
      {
        text: "Savol 01",
        options: ["A - variyant", "B - variyant", "C - variyant"],
        correctIndex: 0,
      },
      {
        text: "Savol 02",
        options: ["A - variyant", "B - variyant", "C - variyant"],
        correctIndex: 0,
      },
      {
        text: "Savol 03",
        options: ["A - variyant", "B - variyant", "C - variyant"],
        correctIndex: 0,
      },
      {
        text: "Savol 02",
        options: ["A - variyant", "B - variyant", "C - variyant"],
        correctIndex: 0,
      },
      {
        text: "Savol 03",
        options: ["A - variyant", "B - variyant", "C - variyant"],
        correctIndex: 0,
      },
    ],
  },
];

const getQuizs = async () => {
  const res = await $api.get("/quiz/my-quiz");
  return res.data;
};

const addQuiz = async (data: QuizType) => {
  const { questions, title } = data;
  const res = await $api.post("/quiz", { title });
  const quizId = res.data.id;

  if (questions && questions.length > 0) {
    for (const question of questions) {
      await $api.post(`/quiz/${quizId}/questions`, question);
    }
  }
  return res.data;
};

const deleteQuiz = async (id: number) => {
  const res = await $api.delete(`/quiz/delete/${id}`);
  return res;
};

const updateQuiz = async (id: number, data: Quiz) => {
  questionData = questionData.map((u) => (u.id === id ? data : u));
  return data;
};

// Hook
export function useQuiz() {
  const queryClient = useQueryClient();

  const getQuery = useQuery({
    queryKey: ["quiz"],
    queryFn: getQuizs,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });

  // Qo‘shish
  const addMutation = useMutation({
    mutationFn: addQuiz,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quiz"] }),
  });

  // O‘chirish
  const deleteMutation = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quiz"] }),
  });

  // Yangilash
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Quiz }) =>
      updateQuiz(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quiz"] }),
  });

  return {
    getQuery,
    addMutation,
    deleteMutation,
    updateMutation,
  };
}
