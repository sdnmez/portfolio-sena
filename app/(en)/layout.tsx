import type { Metadata, Viewport } from "next";
import "../globals.css";
import { site } from "@/data/site";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
};

export const viewport: Viewport = {
  themeColor: "#12100e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const localeScript = `(function(){try{var l=localStorage.getItem("sena-locale");if(l==="en"||l==="nl")document.documentElement.lang=l;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
