export type Dream = {
  id: string;
  title: string;
  date: string;
  description: string;
  createdAt: number;
};

const KEY = "dream-journal:dreams";

export function getDreams(): Dream[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Dream[]) : [];
  } catch {
    return [];
  }
}

export function saveDreams(dreams: Dream[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(dreams));
  window.dispatchEvent(new Event("dreams-updated"));
}

export function addDream(d: Omit<Dream, "id" | "createdAt">) {
  const dreams = getDreams();
  const next: Dream = { ...d, id: crypto.randomUUID(), createdAt: Date.now() };
  saveDreams([next, ...dreams]);
  return next;
}

export function updateDream(id: string, patch: Partial<Dream>) {
  saveDreams(getDreams().map((d) => (d.id === id ? { ...d, ...patch } : d)));
}

export function deleteDream(id: string) {
  saveDreams(getDreams().filter((d) => d.id !== id));
}
