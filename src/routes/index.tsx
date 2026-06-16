import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon, Sparkles, BookOpen, Search } from "lucide-react";
import { StarField } from "@/components/StarField";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dream Journal — Capture Your Dreams" },
      { name: "description", content: "Write, save, and revisit your dreams in a beautiful cosmic journal." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <StarField count={80} />
        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-32 text-center">
          <div className="float inline-block mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl bg-primary/40" />
              <Moon className="relative h-24 w-24 text-primary" strokeWidth={1.2} />
            </div>
          </div>

          <h1 className="fade-up text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
            <span className="gradient-text">Capture Your Dreams</span>
            <br />
            <span className="text-foreground/90">Before They Fade Away</span>
          </h1>

          <p className="fade-up mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground" style={{ animationDelay: "0.15s" }}>
            A quiet corner of the cosmos to write down what your mind whispers at night.
            Revisit, reflect, and rediscover the worlds you visit while you sleep.
          </p>

          <div className="fade-up mt-10 flex flex-wrap justify-center gap-3" style={{ animationDelay: "0.3s" }}>
            <Link to="/my-dreams" className="btn-primary inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Start Writing
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-full border border-border hover:bg-accent/30 text-sm font-semibold transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: "Write freely", body: "Distraction-free entries with date, title, and description." },
            { icon: Search, title: "Find anything", body: "Search your archive by title and revisit any night." },
            { icon: Sparkles, title: "Yours alone", body: "All entries live safely in your browser's local storage." },
          ].map((f, i) => (
            <div key={f.title} className="glass p-6 fade-up" style={{ animationDelay: `${0.1 * i}s` }}>
              <f.icon className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
