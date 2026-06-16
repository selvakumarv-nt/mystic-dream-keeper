import { Pencil, Trash2, Calendar } from "lucide-react";
import type { Dream } from "@/lib/dreams";

type Props = {
  dream: Dream;
  onEdit: (d: Dream) => void;
  onDelete: (id: string) => void;
};

export function DreamCard({ dream, onEdit, onDelete }: Props) {
  return (
    <article className="glass p-6 group hover:-translate-y-1 transition-transform duration-300 fade-up">
      <header className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold leading-tight">{dream.title}</h3>
        <div className="flex items-center gap-1 shrink-0">
          <button
            aria-label="Edit"
            onClick={() => onEdit(dream)}
            className="p-2 rounded-md hover:bg-primary/20 text-primary"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            aria-label="Delete"
            onClick={() => onDelete(dream.id)}
            className="p-2 rounded-md hover:bg-destructive/20 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </header>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
        <Calendar className="h-3.5 w-3.5" />
        {new Date(dream.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
      <p className="text-sm text-foreground/80 line-clamp-4 whitespace-pre-wrap">
        {dream.description}
      </p>
    </article>
  );
}
