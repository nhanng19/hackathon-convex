"use client"

import Image from "next/image";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function Home() {

  const [text, setText] = useState("")
  const createTodo = useMutation(api.todos.createTodo)
  const todos = useQuery(api.todos.getTodos)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {todos?.map((todo) => { 
          return <div key={todo._id}>{todo.text}</div>
        })}
        <form onSubmit={e => { 
          e.preventDefault()
          createTodo({
            text,
          })
        }}>
          <input className="text-black" value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit">Create</button>
        </form>
      </div>
    </main>
  );
}
