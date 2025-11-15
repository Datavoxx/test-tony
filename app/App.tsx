"use client";

import { useCallback, useState } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();
  const [open, setOpen] = useState(false);

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV === "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV === "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-950">
      {/* Knapp som triggar chatten */}
      <button
        onClick={() => setOpen(true)}
        className="mb-4 text-xs px-3 py-1 rounded border border-slate-300 hover:bg-slate-200"
      >
        Öppna agent
      </button>

      {/* Bottom sheet-overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="w-full h-full bg-slate-100 dark:bg-slate-950 shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200">
              <h2 className="text-sm font-semibold">Exploring AI Abilities</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-xs px-2 py-1 rounded border border-slate-300 hover:bg-slate-200"
              >
                Stäng
              </button>
            </div>

            <div className="flex-1 mx-auto w-full">
              <ChatKitPanel
                theme={scheme}
                onWidgetAction={handleWidgetAction}
                onResponseEnd={handleResponseEnd}
                onThemeRequest={setScheme}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
