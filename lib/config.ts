import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

// Startskärmen på svenska
export const STARTER_PROMPTS: StartScreenPrompt[] = [];
export const PLACEHOLDER_INPUT = "Skriv här...";
export const GREETING = "Låt mig hjälpa dig Tony med att skapa en kallelse😁";

// Mixad tema-funktion: använder dina playground-värden för 'light'
// och ger rimliga värden i 'dark' så allt förblir läsbart.
export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  // Om din ChatKit-version stödjer detta fält tas det med, annars kan du ta bort raden nedan.
  // colorScheme: theme, 
  radius: "pill",
  // Om 'density' inte stöds i din version, ta bort raden nedan.
  // density: "normal",
  color: {
    grayscale: theme === "dark"
      ? { hue: 220, tint: 6, shade: -2 }   // din tidigare mörka känsla
      : { hue: 0,   tint: 0, shade: 1 },   // playground (ljus)
    accent: {
      primary: theme === "dark" ? "#f5f5f5" : "#050505", // playground svart i light, ljus i dark
      level: 1,
    },
  },
  // Om typografi stöds av din ThemeOption—behåll; annars ta bort hela blocket.
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
      // lägg till dina övriga fontSources här vid behov
    ],
  },
});
