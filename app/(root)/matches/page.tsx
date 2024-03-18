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
            <div className=" max-w-64 mx-auto shadow-lg rounded-lg fixed  bg-gray-900">
              <div className="py-3 px-5 flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">
                  Matches
                </h3>

                <div className="divide-y divide-gray-700">
                  {matchee?.map((match) => {
                    const matchingUser = match.matchee[0];
                    const messages = match?.messages;
                    const lastMessage = messages[messages.length - 1];
                    return (
                      <button
                        key={matchingUser.id}
                        onClick={() => {
                          setChatRoomId(xorHash(userId, matchingUser.id));
                          setMatchId(matchingUser.id);
                        }}
                        className={`w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50 rounded-lg hover:bg-slate-700 ${
                          matchingUser.id === matchId &&
                          "bg-[#3e567c] hover:bg-[#3e567c]"
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
                            <h4 className="text-sm font-semibold text-light-1">
                              {matchingUser.name}
                            </h4>
                            <div className="text-[13px] text-light-1">
                              {messages.length > 0
                                ? `${
                                    lastMessage?.body
                                  } • ${getMessageTimeDifference(
                                    lastMessage?.time
                                  )}`
                                : `New Match • ${getMessageTimeDifference(
                                    match?._creationTime / 1000
                                  )}`}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[65%] justify-between gap-6 flex flex-col max-w-full float-right shadow-lg px-8 py-4  bg-gray-900 rounded-lg">
            {chatRoomId ? (
              <Chat user={user} userId={userId} chatRoomId={chatRoomId} />
            ) : (
              <div className="flex items-center justify-center flex-col gap-4">
                <img
                  className="w-48"
                  src="https://cdn.discordapp.com/attachments/1039717356395560961/1219233111125262387/FinalAirplaneLuv.png?ex=660a8e51&is=65f81951&hm=e2ac50206c01574c4f080bc9cc98ae0faabeaeb1c637a6fc58f9d032ecbfd17c&"
                />
                <h2 className="text-center font-semibold text-light-1">
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
