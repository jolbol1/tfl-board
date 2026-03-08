import * as React from "react";
import { Input as AriaInput } from "react-aria-components";

import { cn } from "@/lib/utils";

export type InputProps = React.ComponentPropsWithoutRef<typeof AriaInput>;

const _Input = ({ className, ...props }: InputProps) => {
  return (
    <AriaInput
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

export { _Input as Input };
