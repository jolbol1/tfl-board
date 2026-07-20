import type { ReactNode } from "react";
import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";

import appCss from "../styles.css?url";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "TFL Boards" },
      {
        name: "description",
        content: "The TFL departure boards online",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="font-sans dark">
      <head>
        <HeadContent />
      </head>
      <body className="relative z-10 flex h-[100dvh] max-h-[100dvh] max-w-[100dvw] flex-col overflow-y-auto bg-black px-2">
        <div className="absolute inset-0 z-[-1] h-full w-full">
          <img
            src="/background.png"
            alt="A London Underground platform"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        {children}
        <footer className="w-full text-center">
          Built by{" "}
          <a href="https://jamesshopland.com" className="underline">
            James Shopland
          </a>
        </footer>
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
