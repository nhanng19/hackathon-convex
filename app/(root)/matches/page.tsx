"use client";

import { useEffect, useState } from "react";
import { xorHash } from "@/lib/utils";
import useGetMatches from "@/hooks/useGetMatches";
import Chat from "@/components/chat/chat";

const Matches = () => {
  const { matchee, userId, user } = useGetMatches();
  const [chatRoomId, setChatRoomId] = useState<string>();
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
                  {matchee?.map((match) => (
                    <button
                      onClick={() => {
                        setChatRoomId(xorHash(userId, match.id));
                      }}
                      className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50"
                    >
                      <div className="flex items-center">
                        <img
                          className="rounded-full items-start flex-shrink-0 mr-3 w-12 h-12"
                          src={match.photo}
                          height="32"
                          alt="Marie Zulfikar"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">
                            {match.name}
                          </h4>
                          <div className="text-[13px]">
                            New Match · 2hrs ago
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {chatRoomId && (
            <Chat user={user} userId={userId} chatRoomId={chatRoomId} />
          )}
        </main>
      </div>
    </section>
  );
};

export default Matches;
