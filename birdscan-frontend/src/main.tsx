import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import main_es from "./translations/es/main.json";
import main_en from "./translations/en/main.json";
import main_ch from "./translations/ch/main.json";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/Main/ThemeContext.tsx";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      main: main_es,
    },
    en: {
      main: main_en,
    },
    ch: {
      main: main_ch,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  </StrictMode>
);
