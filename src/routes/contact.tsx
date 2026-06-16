import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dream Journal" },
      { name: "description", content: "Get in touch with the Dream Journal team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (form.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <div className="text-center mb-10 fade-up">
        <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold gradient-text">Get in touch</h1>
        <p className="text-muted-foreground mt-2">
          Have a question, suggestion, or a strange dream to share?
        </p>
      </div>

      <form onSubmit={onSubmit} className="glass p-6 sm:p-8 space-y-5 fade-up" style={{ animationDelay: "0.1s" }}>
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            className="input-field"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="input-field"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@dreams.com"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            rows={5}
            className="input-field resize-none"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us what's on your mind..."
          />
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
        </div>

        <button type="submit" className="btn-primary inline-flex items-center gap-2">
          <Send className="h-4 w-4" /> Send Message
        </button>

        {sent && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" /> Thanks! Your message has been received.
          </div>
        )}
      </form>
    </div>
  );
}
