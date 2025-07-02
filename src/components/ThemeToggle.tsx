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
      className="h-9 w-9 transition-all duration-300 hover:bg-primary/10 hover:scale-110"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 transition-all duration-300" />
      ) : (
        <Sun className="h-4 w-4 transition-all duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}