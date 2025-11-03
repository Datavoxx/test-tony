import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

// Startskärmen på svenska
export const STARTER_PROMPTS: StartScreenPrompt[] = [];
export const PLACEHOLDER_INPUT = "Skriv här...";
export const GREETING = "Låt mig hjälpa dig Tony med att skapa en kallelse😁";

// Viktigt: behåll signaturen (theme: ColorScheme) då ChatKitPanel anropar så.
// Vi ignorerar värdet och returnerar alltid en ljus palett.
export const getThemeConfig = (_theme: ColorScheme): ThemeOption => ({
  color: {
    // Ljus, neutral gråskala (ingen blå ton)
    grayscale: { hue: 0, tint: 0, shade: 1 },
    // Svart accent (tydliga knappar/ikoner)
    accent: { primary: "#050505", level: 1 },
  },
  // Rundade hörn enligt din bas
  radius: "pill",

  // Typografi (kan tas bort om din ThemeOption-typ inte stödjer det)
  typography: {
    baseSize: 16,
    fontFamily:
      '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
    fontFamilyMono:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
    fontSources: [
      {
        family: "OpenAI Sans",
        src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2",
        weight: 400,
        style: "normal",
        display: "swap",
      },
      // lägg fler font-källor här vid behov
    ],
  },
});
