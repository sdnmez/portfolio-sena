import { cookies } from "next/headers";
import { Suspense } from "react";
import { HomePage } from "@/components/site/HomePage";
import { getMessages, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en");

async function PageContent() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return <HomePage locale={locale} messages={getMessages(locale)} />;
}

function PageFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <div className="text-center">
        <p className="font-display text-5xl tracking-tight">
          Sena<span className="text-accent">.</span>
        </p>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
          Portfolio / Vol. 01
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageContent />
    </Suspense>
  );
}
