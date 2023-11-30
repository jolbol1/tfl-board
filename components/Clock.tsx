"use client";

import React, { useState, useEffect } from "react";

export const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      setTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <time className="text-yellow-400 bg-yellow-400/5 h-fit pt-1 px-2 font-tfl tabular-nums">
      {time}
    </time>
  );
};
