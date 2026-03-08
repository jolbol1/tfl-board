import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ClassFunction<T> = (values: T) => string;
type ClassValues<T> = (ClassValue | ClassFunction<T>)[];

// Helper function to resolve className callbacks against render state
export function cnv<T>(values: T, ...inputs: ClassValues<T>) {
  const processedInputs = inputs.map((input) => {
    if (typeof input === "function") {
      return input(values);
    }
    return input;
  });

  return cn(processedInputs);
}
