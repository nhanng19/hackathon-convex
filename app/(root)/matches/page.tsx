"use client";

import { useEffect, useState } from "react";
import { getMessageTimeDifference, xorHash } from "@/lib/utils";
import useGetMatches from "@/hooks/useGetMatches";
import Chat from "@/components/chat/chat";
const Matches = () => {
  const { matchee, userId, user } = useGetMatches();
  const [chatRoomId, setChatRoomId] = useState<string>();
  const [matchId, setMatchId] = useState<string>();
  return (
    <section className="main-container">
      <div className="w-full h-full max-w-4xl">
        <main className="gap-2.5">
          <div style={{ width: "20%" }}>
            <div className=" max-w-64 mx-auto bg-white shadow-lg rounded-lg fixed border border-light-2">
              <div className="py-3 px-5 flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">
                  Matches
                </h3>

                <div className="divide-y divide-gray-200">
                  {matchee?.map((match) => {
                    const matchingUser = match.matchee[0];
                    const messages = match?.messages;
                    const lastMessage = messages[messages.length - 1];
                    return (
                      <button
                        onClick={() => {
                          setChatRoomId(xorHash(userId, matchingUser.id));
                          setMatchId(matchingUser.id);
                        }}
                        className={`w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50 rounded-md hover:bg-slate-100 ${matchingUser.id === matchId &&
                          "bg-slate-200 hover:bg-slate-200"
                          }`}
                      >
                        <div className="flex items-center">
                          <img
                            className="rounded-full items-start flex-shrink-0 mr-3 w-12 h-12"
                            src={matchingUser.photo}
                            height="32"
                            alt={matchingUser.name}
                          />
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">
                              {matchingUser.name}
                            </h4>
                            <div className="text-[13px]">
                              {messages.length > 0 ? `${lastMessage?.body} • ${getMessageTimeDifference(lastMessage?.time)}` : `New Match • ${getMessageTimeDifference(match?._creationTime / 1000)}`}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[65%] justify-between gap-6 flex flex-col max-w-full float-right shadow-lg px-8 py-4 border border-light-2">
            {chatRoomId ? (
              <Chat user={user} userId={userId} chatRoomId={chatRoomId} />
            ) : (
              <div className="flex items-center justify-center flex-col gap-4">
                <img
                  className="w-48"
                  src="https://static.vecteezy.com/system/resources/previews/007/633/319/non_2x/paper-plane-icon-hand-drawn-paper-airplane-illustration-free-vector.jpg"
                />
                <h2 className="text-center font-semibold">
                  Your matches appear here.
                </h2>
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
};

export default Matches;
