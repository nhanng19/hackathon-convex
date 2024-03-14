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