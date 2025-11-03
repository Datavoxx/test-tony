import { StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

// Startskärm (svenska)
export const STARTER_PROMPTS: StartScreenPrompt[] = [];
export const PLACEHOLDER_INPUT = "Skriv här...";
export const GREETING = "Låt mig hjälpa dig Tony med att skapa en kallelse😁";

// Alltid ljust tema – neutral gråskala och svart accent
export const getThemeConfig = (): ThemeOption => ({
  colorScheme: "light",
  radius: "pill",
  // density kan utelämnas om din ChatKit-version inte stödjer det
  // density: "normal",
  color: {
    // Så ljust och neutralt som möjligt utan blåstick
    grayscale: { hue: 0, tint: 0, shade: 1 },
    // Svart primärfärg (ikon/knappmarkeringar etc.)
    accent: { primary: "#050505", level: 1 },
  },
  // typografi-blocket är valfritt; ta bort om din version klagar
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
      // lägg ev. fler källor här
    ],
  },
});
