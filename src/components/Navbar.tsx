import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Moon } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/my-dreams", label: "My Dreams" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/40 border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Moon className="h-6 w-6 text-primary" />
          <span className="gradient-text">Dream Journal</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-foreground/80 hover:text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
                className="transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-md hover:bg-accent/30"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background/80 backdrop-blur-xl">
          <ul className="flex flex-col p-4 gap-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-accent/30"
                  activeProps={{ className: "block px-3 py-2 rounded-md text-primary bg-accent/20" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
