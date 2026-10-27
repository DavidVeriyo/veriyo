import React from "react";
import { renderToString } from "react-dom/server";
import Website from "./Website";

export function render() {
  // Only pre-render the marketing homepage (page === "home")
  // The app/login/portal views require auth and aren't crawled
  const html = renderToString(
    <React.StrictMode>
      <Website onLogin={() => {}} />
    </React.StrictMode>
  );
  return html;
}
