"use client";

import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const [text, setText] = useState("");
  const createTodo = useMutation(api.todos.createTodo);
  const todos = useQuery(api.todos.getTodos);

  return (
    <main>
        Home
    </main>
  );
}
