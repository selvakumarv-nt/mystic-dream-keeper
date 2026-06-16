import { Moon } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Moon className="h-4 w-4 text-primary" />
          <span className="gradient-text font-semibold">Dream Journal</span>
        </div>
        <p>© {new Date().getFullYear()} Dream Journal. Sweet dreams.</p>
      </div>
    </footer>
  );
}
