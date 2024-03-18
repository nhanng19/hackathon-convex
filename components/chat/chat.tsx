import { useEffect, useState } from "react";
import { getSingleUser } from "@/convex/user";
import useStoreUserEffect from "@/hooks/useStoreUser";
import useGetMatches from "@/hooks/useGetMatches";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getMatchee, isUserOnline } from "@/lib/utils";
import Link from "next/link";
interface Props {
  user: any;
  userId: Id<"user"> | null;
  chatRoomId: string | undefined;
}

const Chat = ({ user, userId, chatRoomId }: Props) => {
  const obj = useQuery(api.matches.getChatRoom, { hashKey: chatRoomId, userId: userId });
  const [newMessageText, setNewMessageText] = useState("");
  const [isOnline, setIsOnline] = useState<boolean>();
  const sendMessage = useMutation(api.matches.sendMessage);
  const matchee = useQuery(api.user.getSingleUser, {
    userId: obj?.matcheeId,
  });
  console.log(matchee)
  useEffect(() => { 
    setIsOnline(isUserOnline(user.lastSeenOn))
  }, [user])
  
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  }, [obj?.chatRoom]);

  if (!matchee) return null

  return (
    <>
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-800">
        <Link
          href={`/profile/${matchee._id}`}
          className="relative flex items-center space-x-4 hover:bg-slate-700 w-full rounded-md"
        >
          <div className="relative">
            <span className={"absolute right-0 bottom-0 text-green-500"}>
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <img
              src={matchee?.imageUrl}
              alt=""
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-light-1 mr-3">{matchee?.name}</span>
            </div>
            <span className="text-lg text-gray-400">
              Likes{" "}
              {matchee.cuisines.map((cuisine: any, indx: number) => (
                <span key={indx}>
                  {indx < user.cuisines.length - 1
                    ? `${cuisine}, `
                    : `and ${cuisine} cuisines`}
                </span>
              ))}
            </span>
          </div>
        </Link>
      </div>
      <h2 className="text-sm font-light text-light-2 italic">
        🎉 You've matched with these restaurants!
      </h2>
      <div className="flex overflow-x-scroll max-w-full gap-4 custom-scrollbar">
        {obj?.chatRoom?.commonRestaurants?.map((restaurant: any) => (
          <article key={restaurant.alias} className="relative flex flex-col justify-end overflow-hidden rounded-2xl p-4 pt-40 min-w-48 max-h-24">
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
            <h3 className="z-10 mt-3 text-3xl font-bold text-white">
              {restaurant.name}
            </h3>
            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              {restaurant?.location?.display_address[0]}{" "}
              {restaurant?.location?.display_address[1]}
            </div>
          </article>
        ))}
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {obj?.chatRoom?.messages.length > 0 ? (
          obj?.chatRoom?.messages?.map((message: any) =>
            message?.userId == userId ? (
              <div key={message.profilePhoto} className="chat-message">
                <div className="flex items-end justify-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-br-nonetext-white bg-blue text-white">
                        {message.body}
                      </span>
                    </div>
                  </div>
                  <img
                    src={message.profilePhoto}
                    alt="My profile"
                    className="w-6 h-6 rounded-full order-2"
                  />
                </div>
              </div>
            ) : (
              <div key={message.profilePhoto} className="chat-message">
                <div className="flex items-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-800 text-gray-200">
                        {message.body}
                      </span>
                    </div>
                  </div>
                  <img
                    src={matchee?.imageUrl}
                    alt="My profile"
                    className="w-6 h-6 rounded-full order-1"
                  />
                </div>
              </div>
            )
          )
        ) : (
          <>
            <h2 className="text-center text-heading4-medium m-0 text-light-1">
              Chat is empty
            </h2>
            <p className="text-center text-small-regular text-light-3 !m-0">
              Be the one to break the ice
            </p>
          </>
        )}
      </div>
      <div className="border-t-2 border-gray-800 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-light-1 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6 text-light-1"
                fill="#FFFFFF"
                height="200px"
                width="200px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 70.984 70.984"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path d="M0.001,70.984l8.775-17.178c-4.05-5.766-6.184-12.52-6.184-19.611C2.592,15.34,17.932,0,36.788,0 s34.195,15.341,34.195,34.197c0,18.855-15.34,34.195-34.194,34.195c-7.094,0-13.848-2.134-19.612-6.184L0.001,70.984z M17.571,57.515l1,0.759c5.28,4.003,11.58,6.118,18.219,6.118c16.649,0,30.194-13.546,30.194-30.195 C66.984,17.546,53.438,4,36.789,4C20.139,4,6.593,17.545,6.593,34.195c0,6.636,2.116,12.937,6.118,18.219l0.758,1l-4.284,8.387 L17.571,57.515z"></path>{" "}
                    <circle cx="53.745" cy="34.195" r="4.206"></circle>{" "}
                    <circle cx="36.592" cy="34.195" r="4.206"></circle>{" "}
                    <circle cx="19.435" cy="34.195" r="4.206"></circle>{" "}
                  </g>
                </g>
              </svg>
            </button>
          </span>
          <form
            className="w-full"
            onSubmit={async (e) => {
              e.preventDefault();
              await sendMessage({
                compositeKey: obj?.chatRoom.compositeKey,
                message: {
                  body: newMessageText,
                  author: user.name,
                  userId: userId,
                  profilePhoto: user.imageUrl,
                  time: Math.floor(Date.now() / 1000),
                },
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
              className="w-full focus:outline-none focus:placeholder-gray-400 text-light-1 placeholder-gray-400 pl-12 bg-gray-700 rounded-md py-3"
            />
          </form>
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-light-1 bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
