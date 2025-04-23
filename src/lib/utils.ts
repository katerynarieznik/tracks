import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomPercent = (min = 0, max = 100) => {
  return `${Math.floor(min + Math.random() * (max - min))}%`;
};
