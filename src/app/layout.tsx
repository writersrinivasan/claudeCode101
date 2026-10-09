import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Claude Code 101 — Developer Portal",
    template: "%s · Claude Code 101",
  },
  description:
    "The go-to reference for developers learning Claude Code: concepts, live-demo walkthroughs, hands-on labs, prompt library and cheat sheet.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#151412" },
  ],
};

// Applies a saved theme before first paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem("cc101:theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        {children}
        <footer className="site-footer">
          <div className="container">
            <span>Claude Code 101 · Built for the “From Natural Language to Production-Ready Software” session</span>
            <span>
              Official docs:{" "}
              <a href="https://docs.claude.com/en/docs/claude-code/overview" target="_blank" rel="noreferrer">
                docs.claude.com
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
