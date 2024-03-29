import { Id } from "@/convex/_generated/dataModel";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// generated by shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mapToStringArray = (options : any, values : any) => {
  return options.filter((option : any) => values.includes(option.name));
};

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export const convertEpoch = (time: number) => {
  const date = new Date(time)
  return date.toLocaleString()
}

export const getBorderStyle = (exitX: number) => {
    if (exitX > 0) {
      return {
        boxShadow: `rgba(0, 255, 0, 0.4) 0px 5px, rgba(0, 255, 0, 0.3) 0px 10px, rgba(0, 255, 0, 0.2) 0px 15px, rgba(0, 255, 0, 0.1) 0px 20px, rgba(0, 255, 0, 0.05) 0px 25px`,
      };
    } else if (exitX < 0) {
      return {
        boxShadow: `rgba(255, 0, 0, 0.4) 0px 5px, rgba(255, 0, 0, 0.3) 0px 10px, rgba(255, 0, 0, 0.2) 0px 15px, rgba(255, 0, 0, 0.1) 0px 20px, rgba(255, 0, 0, 0.05) 0px 25px`,
      };
    } else {
      return {};
    }
  };

export const getMatchee = (match: any, userId : any) => {
  const matchee = match?.pair.filter((user: any) => user.id !== userId);
  return {...match, matchee};
}

export const  xorHash = (str1: any, str2: any) => {
  const maxLength = Math.max(str1.length, str2.length);
  const paddedStr1 = str1.padEnd(maxLength, " ");
  const paddedStr2 = str2.padEnd(maxLength, " ");
  let hash = "";
  for (let i = 0; i < maxLength; i++) {
    const charCode1 = paddedStr1.charCodeAt(i);
    const charCode2 = paddedStr2.charCodeAt(i);
    const xorResult = charCode1 ^ charCode2;
    const hexString = xorResult.toString(16).padStart(2, "0");
    hash += hexString;
  }
  return hash;
}

export function isUserOnline(epochTime: number) {
  const currentTime = Date.now();
  const timeDifference = currentTime - epochTime * 1000;
  return timeDifference <= 10000;
}

export function getMessageTimeDifference(epochTime: number) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = currentTime - epochTime;
  if (timeDifference <= 30) {
    return "Just now";
  } else if (timeDifference < 60) {
    return timeDifference + " sec. ago";
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return minutes + " min. ago";
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return hours + " hr. ago";
  } else {
    const days = Math.floor(timeDifference / 86400);
    return days + " day ago";
  }
} 
export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function determineNotifications(epochTime: number) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = currentTime - epochTime / 1000;
  return timeDifference <= 10 ? true : false
}