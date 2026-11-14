"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The theme is only known on the client, so render a placeholder until mounted
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme !== "light";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? label : "Toggle theme"}
      title={mounted ? label : undefined}
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--border-strong)] hover:text-[var(--text)]"
    >
      {mounted ? (
        isDark ? (
          <HiOutlineSun size={17} />
        ) : (
          <HiOutlineMoon size={17} />
        )
      ) : (
        <span className="block h-[17px] w-[17px]" />
      )}
    </button>
  );
}
