"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

export const getTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const Clock = ({
  variant = "old",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant: "old" | "new" }) => {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    setTime(getTime());

    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn("flex w-full justify-center h-fit", {
        "bg-black": variant === "old",
      })}
      {...props}
    >
      <time
        className={cn("text-yellow-400 h-fit pt-1 px-2 font-tfl tabular-nums", {
          "bg-yellow-400/5": variant === "old",
        })}
      >
        {time}
      </time>
    </div>
  );
};
