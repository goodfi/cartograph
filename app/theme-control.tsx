"use client";

import { useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";
function readTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "dark" ? value : "system";
}
function subscribe(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== "cartograph-theme" && event.key !== null) return;
    const value = event.newValue;
    document.documentElement.dataset.theme = value === "light" || value === "dark" ? value : "system";
    onChange();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener("cartograph-theme-change", onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("cartograph-theme-change", onChange);
  };
}

export function ThemeControl() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system");
  return (
    <label className="theme-control">
      Theme
      <select value={theme} onChange={(event) => {
        const value = event.target.value;
        if (value !== "system" && value !== "light" && value !== "dark") return;
        document.documentElement.dataset.theme = value;
        try { localStorage.setItem("cartograph-theme", value); } catch { /* Storage may be disabled; the current page still uses the choice. */ }
        window.dispatchEvent(new Event("cartograph-theme-change"));
      }}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
