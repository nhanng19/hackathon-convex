import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { convertEpoch } from "@/lib/utils";

const PostCard = (props: any) => { 
    const { body, _creationTime, userId } = props.post;
    const user = useQuery(api.user.getSingleUser, {
        userId: userId
    });
    return (
        <article className="p-6 text-base rounded-lg bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-white font-semibold"><img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={user?.imageUrl}
                            alt="Michael Gough"/>{user?.name}</p>
                    <p className="text-sm  text-gray-400"><time  dateTime="2022-02-08"
                                title="February 8th, 2022">{convertEpoch(_creationTime)}</time></p>
                </div>
                <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400  rounded-lg  focus:ring-4 focus:outline-none  bg-gray-900 hover:bg-gray-700 focus:ring-gray-600"
                    type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                </button>
                <div id="dropdownComment1"
                    className="hidden z-10 w-36  rounded divide-y  shadow bg-gray-700 divide-gray-600">
                    <ul className="py-1 text-sm  text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton">
                        <li>
                            <a href="#"
                                className="block py-2 px-4  hover:bg-gray-600 hover:text-white">Edit</a>
                        </li>
                        <li>
                            <a href="#"
                                className="block py-2 px-4  hover:bg-gray-600 hover:text-white">Remove</a>
                        </li>
                        <li>
                            <a href="#"
                                className="block py-2 px-4  hover:bg-gray-600 hover:text-white">Report</a>
                        </li>
                    </ul>
                </div>
            </footer>
                    <p className=" text-gray-400">
                        {body}
                    </p>
            <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                    className="flex items-center text-sm hover:underline text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                    </svg>
                    Reply
                </button>
            </div>
        </article>
    )
}

export default PostCard