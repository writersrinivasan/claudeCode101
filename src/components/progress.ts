"use client";

import { useSyncExternalStore } from "react";

// Completed-module tracking, persisted per browser in localStorage.
const KEY = "cc101:completed";
const listeners = new Set<() => void>();

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCompleted(): Set<string> {
  const raw = useSyncExternalStore(subscribe, read, () => "");
  return new Set(raw ? raw.split(",") : []);
}

export function setCompleted(slug: string, done: boolean) {
  const set = new Set(read().split(",").filter(Boolean));
  if (done) set.add(slug);
  else set.delete(slug);
  try {
    localStorage.setItem(KEY, [...set].join(","));
  } catch {
    // Storage blocked; progress just won't persist.
  }
  listeners.forEach((l) => l());
}

export function resetProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  listeners.forEach((l) => l());
}
