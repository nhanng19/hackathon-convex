"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { getSingleUser } from "@/convex/user";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { convertEpoch } from "@/lib/utils";
import Image from "next/image";

const NAME = "nhan";

const Matches = () => {
  const messages = useQuery(api.user.list);
  const sendMessage = useMutation(api.user.send);
  const userId = useStoreUserEffect();
  const user = useQuery(api.user.getSingleUser, {
    userId: userId,
  });
  const matches = useQuery(api.matches.getUserMatches, {
    userId: userId
  })
  console.log(matches)
  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  return (
    <section className="main-container">
      <div className="w-full h-full max-w-4xl">
        <main className="chat flex items-start gap-2.5">
          <div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <h1 className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              Matches:
            </h1>
            <a
              href="#"
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              Ryan
            </a>
            <a
              href="#"
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              Sarah
            </a>
            <a
              href="#"
              className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              Mandy
            </a>
          </div>
          <div>
            <p>
              connected as <strong>{user?.name}</strong>
            </p>
            {messages?.map((message) => (
              <article
                key={message._id}
                className={
                  message.userId === userId
                    ? "message-mine text-right flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-t-xl rounded-ts-xl dark:bg-gray-700"
                    : ""
                }
              >
                <Image className="w-8 h-8 rounded-full" src={message.profilePhoto} alt="profile pic" width={32} height={32} />
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {message.author} {convertEpoch(message._creationTime)}
                </div>

                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                  {message.body}
                </p>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Delivered
                </span>
              </article>
            ))}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await sendMessage({
                  body: newMessageText,
                  author: user.name,
                  userId: userId,
                  profilePhoto: user.imageUrl
                });
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
          </div>
        </main>
      </div>
    </section>
  );
};

export default Matches;
