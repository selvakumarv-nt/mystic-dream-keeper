import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { DreamForm } from "@/components/DreamForm";
import { DreamCard } from "@/components/DreamCard";
import { type Dream, getDreams, deleteDream } from "@/lib/dreams";

export const Route = createFileRoute("/my-dreams")({
  head: () => ({
    meta: [
      { title: "My Dreams — Dream Journal" },
      { name: "description", content: "Browse, search, and edit all your saved dreams." },
    ],
  }),
  component: MyDreams,
});

function MyDreams() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [editing, setEditing] = useState<Dream | undefined>();

  useEffect(() => {
    const sync = () => setDreams(getDreams());
    sync();
    window.addEventListener("dreams-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("dreams-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const filtered = useMemo(
    () =>
      dreams.filter((d) => d.title.toLowerCase().includes(query.toLowerCase().trim())),
    [dreams, query],
  );

  const onEdit = (d: Dream) => {
    setEditing(d);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id: string) => {
    if (confirm("Delete this dream forever?")) deleteDream(id);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 mb-8 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text truncate">My Dreams</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {dreams.length} {dreams.length === 1 ? "entry" : "entries"} in your journal
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(undefined);
            setShowForm((s) => !s);
          }}
          className="btn-primary inline-flex items-center gap-2 shrink-0"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Hide" : "New Dream"}
        </button>
      </div>

      {showForm && (
        <div className="mb-12">
          <DreamForm
            initial={editing}
            onDone={() => {
              setEditing(undefined);
            }}
          />
        </div>
      )}

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          className="input-field pl-11"
          placeholder="Search dreams by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="glass p-12 text-center">
          <p className="text-muted-foreground">
            {dreams.length === 0
              ? "Your journal is empty. Write your first dream above."
              : "No dreams match your search."}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d) => (
            <DreamCard key={d.id} dream={d} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
