import { useEffect, useState } from "react";
import { getSingleUser } from "@/convex/user";
import useStoreUserEffect from "@/hooks/useStoreUser";
import useGetMatches from "@/hooks/useGetMatches";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getMatchee, isUserOnline } from "@/lib/utils";
interface Props {
  user: any;
  userId: Id<"user"> | null;
  chatRoomId: string | undefined;
}

const Chat = ({ user, userId, chatRoomId }: Props) => {
  const chatRoom = useQuery(api.matches.getChatRoom, { hashKey: chatRoomId });
  const [matchee, setMatchee] = useState();
  const [newMessageText, setNewMessageText] = useState("");
  const [isOnline, setIsOnline] = useState<boolean>();
  const sendMessage = useMutation(api.matches.sendMessage);
  
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
  }, [chatRoom]);

  useEffect(() => {
    if (chatRoom) {
      const matchee = getMatchee(chatRoom?.pair, userId);
      setMatchee(matchee);
    }
  }, [chatRoom]);

  return (
    <div className="justify-between gap-4 flex flex-col max-w-full w-[65%] float-right shadow-lg px-8 py-4 border border-light-2">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <span className={"absolute right-0 bottom-0" + ` ${isOnline ? "text-green-500" : "text-gray-500"}`}>
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <img
              src={matchee?.photo}
              alt=""
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{matchee?.name}</span>
            </div>
            <span className="text-lg text-gray-600">Likes</span>
          </div>
        </div>
      </div>
      <h2 className="text-sm">🎉 You've matched with these restaurants!</h2>
      <div className="flex overflow-x-scroll max-w-full gap-4">
        {chatRoom?.commonRestaurants?.map((restaurant) => (
          <article className="relative flex flex-col justify-end overflow-hidden rounded-2xl p-4 pt-40 min-w-48 max-h-24">
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
        {chatRoom?.messages.length > 0 ? (
          chatRoom?.messages?.map((message) =>
            message?.userId == userId ? (
              <div className="chat-message">
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
              <div className="chat-message">
                <div className="flex items-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                        {message.body}
                      </span>
                    </div>
                  </div>
                  <img
                    src={message.profilePhoto}
                    alt="My profile"
                    className="w-6 h-6 rounded-full order-1"
                  />
                </div>
              </div>
            )
          )
        ) : (
          <>
            <h2 className="text-center text-heading4-medium m-0">
              Chat is empty
            </h2>
            <p className="text-center text-small-regular text-light-4 !m-0">
              Be the one to break the ice
            </p>
          </>
        )}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </button>
          </span>
          <form
            className="w-full"
            onSubmit={async (e) => {
              e.preventDefault();
              await sendMessage({
                compositeKey: chatRoom.compositeKey,
                message: {
                  body: newMessageText,
                  author: user.name,
                  userId: userId,
                  profilePhoto: user.imageUrl,
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
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />
          </form>
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-black bg-blue-500 hover:bg-blue-400 focus:outline-none"
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
    </div>
  );
};

export default Chat;
