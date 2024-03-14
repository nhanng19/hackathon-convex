"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { getSingleUser } from "@/convex/user";
import useStoreUserEffect from "@/hooks/useStoreUser";

const NAME = "nhan";

const Activity = () => {
  const messages = useQuery(api.user.list);
  const sendMessage = useMutation(api.user.send);
  const userId = useStoreUserEffect();
  const user = useQuery(api.user.getSingleUser, {
      userId: userId,
  });

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    // Make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  return (
    <section className="main-container">
      <div className="w-full h-full max-w-4xl">
        <main className="chat">
          <header>
            <h1 className="">Matches</h1>
            <p>
              connected as <strong>{`${user}`}</strong> 
            </p>
          </header>
          {messages?.map((message) => (
            <article
              key={message._id}
              className={message.author === NAME ? "message-mine" : ""}
            >
              <div>{message.author}</div>

              <p>{message.body}</p>
            </article>
          ))}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await sendMessage({ body: newMessageText, author: NAME });
              setNewMessageText("");
            }}
          >
            <input
              value={newMessageText}
              onChange={async (e) => {
                const text = e.target.value;
                setNewMessageText(text);
              }}
              placeholder="Write a message…"
            />
            <button type="submit" disabled={!newMessageText}>
              Send
            </button>
          </form>
        </main>
      </div>
    </section>
  );
};

export default Activity;
