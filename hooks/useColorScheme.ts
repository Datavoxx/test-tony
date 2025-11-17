"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

export type ColorScheme = "light" | "dark";
export type ColorSchemePreference = ColorScheme | "system";

// We keep the keys but they no longer affect the scheme.
const STORAGE_KEY = "chatkit-color-scheme";
const PREFERS_DARK_QUERY = "(prefers-color-scheme: dark)";

function getMediaQuery(): MediaQueryList | null {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return null;
  }
  try {
    return window.matchMedia(PREFERS_DARK_QUERY);
  } catch {
    return null;
  }
}

// --- We still implement system detection (not used anymore, but harmless) ---
function getSystemSnapshot(): ColorScheme {
  const media = getMediaQuery();
  return media?.matches ? "dark" : "light";
}

function getServerSnapshot(): ColorScheme {
  return "light";
}

function subscribeSystem(listener: () => void): () => void {
  const media = getMediaQuery();
  if (!media) return () => {};

  const handler = () => listener();

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }

  if (typeof media.addListener === "function") {
    media.addListener(handler);
    return () => media.removeListener(handler);
  }

  return () => {};
}

function readStoredPreference(): ColorSchemePreference | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark") return raw;
    if (raw === "system") return "system";
    return null;
  } catch {
    return null;
  }
}

function persistPreference(preference: ColorSchemePreference): void {
  if (typeof window === "undefined") return;

  try {
    if (preference === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, preference);
    }
  } catch {}
}

// --- HERE WE FORCE THE ENTIRE APP INTO LIGHT MODE ---
function applyDocumentScheme(): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  root.dataset.colorScheme = "light";
  root.classList.remove("dark");
  root.style.colorScheme = "light";
}

// RESULT TYPE
type UseColorSchemeResult = {
  scheme: ColorScheme;
  preference: ColorSchemePreference;
  setScheme: (scheme: ColorScheme) => void;
  setPreference: (preference: ColorSchemePreference) => void;
  resetPreference: () => void;
};

function useSystemColorScheme(): ColorScheme {
  return useSyncExternalStore(subscribeSystem, getSystemSnapshot, getServerSnapshot);
}

// --- MAIN HOOK ---
export function useColorScheme(
  initialPreference: ColorSchemePreference = "light" // default is now light
): UseColorSchemeResult {

  // Still stored, but NOT used to determine actual UI theme
  const [preference, setPreferenceState] = useState<ColorSchemePreference>(() => {
    if (typeof window === "undefined") return initialPreference;
    return readStoredPreference() ?? initialPreference;
  });

  // --- IGNORE EVERYTHING: ALWAYS return "light" ---
  const scheme: ColorScheme = "light";

  useEffect(() => {
    persistPreference(preference);
  }, [preference]);

  useEffect(() => {
    applyDocumentScheme(); // always applies light
  }, [scheme]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      setPreferenceState((current) => readStoredPreference() ?? current);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setPreference = useCallback((next: ColorSchemePreference) => {
    setPreferenceState(next);
  }, []);

  const setScheme = useCallback(() => {
    // Ignored, but updated for consistency
    setPreferenceState("light");
  }, []);

  const resetPreference = useCallback(() => {
    setPreferenceState("light");
  }, []);

  return {
    scheme,        // ALWAYS "light"
    preference,    // stored value (not used for UI)
    setScheme,
    setPreference,
    resetPreference,
  };
}
