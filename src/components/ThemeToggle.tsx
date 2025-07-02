import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-10 w-10 rounded-xl glass transition-all duration-500 hover:shadow-glow hover:scale-110 group relative overflow-hidden"
    >
      <div className="relative z-10 transition-transform duration-500">
        {theme === "light" ? (
          <Moon className="h-5 w-5 transition-all duration-500 rotate-0 scale-100 group-hover:rotate-180" />
        ) : (
          <Sun className="h-5 w-5 transition-all duration-500 rotate-0 scale-100 group-hover:rotate-180" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}