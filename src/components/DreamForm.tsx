import { useEffect, useState } from "react";
import type { Dream } from "@/lib/dreams";
import { addDream, updateDream } from "@/lib/dreams";

type Props = {
  initial?: Dream;
  onDone?: () => void;
};

export function DreamForm({ initial, onDone }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDate(initial.date);
      setDescription(initial.description);
    }
  }, [initial]);

  const reset = () => {
    setTitle("");
    setDate(new Date().toISOString().slice(0, 10));
    setDescription("");
    setErrors({});
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!date) errs.date = "Date is required";
    if (!description.trim() || description.trim().length < 10)
      errs.description = "Describe your dream (min 10 characters)";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (initial) {
      updateDream(initial.id, { title: title.trim(), date, description: description.trim() });
    } else {
      addDream({ title: title.trim(), date, description: description.trim() });
      reset();
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onDone?.();
  };

  return (
    <form onSubmit={onSubmit} className="glass p-6 sm:p-8 space-y-5 fade-up">
      <div>
        <label className="block text-sm font-medium mb-2">Dream Title</label>
        <input
          className="input-field"
          placeholder="A flight over silver oceans..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Date</label>
        <input
          type="date"
          className="input-field"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Dream Description</label>
        <textarea
          rows={6}
          className="input-field resize-none"
          placeholder="What did you see? Who was there? How did it feel?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-destructive">{errors.description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" className="btn-primary">
          {initial ? "Update Dream" : "Save Dream"}
        </button>
        {saved && <span className="text-sm text-primary">✓ Saved to your journal</span>}
      </div>
    </form>
  );
}
