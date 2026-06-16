import { createFileRoute } from "@tanstack/react-router";
import { Brain, Heart, Sparkles, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dream Journal" },
      { name: "description", content: "Why dream journaling matters and how it can change the way you think." },
    ],
  }),
  component: About,
});

const benefits = [
  { icon: Brain, title: "Better recall", body: "Writing dreams down trains your brain to remember more of them over time." },
  { icon: Lightbulb, title: "Creative spark", body: "Dreams are a wellspring of imagery, metaphor, and unexpected ideas." },
  { icon: Heart, title: "Emotional clarity", body: "Recurring themes can reveal what your waking mind is processing." },
  { icon: Sparkles, title: "Self-awareness", body: "Patterns in your dreams become patterns you can understand." },
];

function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text mb-6 fade-up">
        About Dream Journal
      </h1>
      <div className="glass p-8 fade-up" style={{ animationDelay: "0.1s" }}>
        <p className="text-foreground/90 leading-relaxed">
          A dream journal is a record of the dreams you remember on waking. It's an old
          practice — used by artists, scientists, and writers — that takes just a few minutes
          a day. The act of writing makes ephemeral things solid, and over time your journal
          becomes a strange, beautiful map of your inner life.
        </p>
        <p className="text-foreground/90 leading-relaxed mt-4">
          Dream Journal is a quiet, private space to do exactly that. Everything you write
          stays on your device. No accounts, no clouds, no sharing — just you and the night.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 fade-up">Why keep one?</h2>
      <div className="grid sm:grid-cols-2 gap-5">
        {benefits.map((b, i) => (
          <div key={b.title} className="glass p-6 fade-up" style={{ animationDelay: `${0.1 * i}s` }}>
            <b.icon className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-semibold mb-1">{b.title}</h3>
            <p className="text-sm text-muted-foreground">{b.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
