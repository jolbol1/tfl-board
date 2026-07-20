import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const londonClockFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export const getTime = (date = new Date()) => londonClockFormatter.format(date);

export const Clock = ({
  variant = "old",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant: "old" | "new" }) => {
  const [time, setTime] = useState<string | null>(null);

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
        {time ?? "--:--:--"}
      </time>
    </div>
  );
};
