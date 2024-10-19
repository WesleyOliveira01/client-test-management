"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "./switch";

export function ModeToggle() {
  const { setTheme, systemTheme,theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (systemTheme === "dark") {
      setIsDarkMode(true);
    }
  }, [systemTheme]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={handleToggle}
        id="darkMode"
      />
      <label
        htmlFor="darkMode"
        className="font-semibold dark:text-zinc-100 text-zinc-900"
      >
        Dark mode
      </label>
    </div>
  );
}
