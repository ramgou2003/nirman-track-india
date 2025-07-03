import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";

interface HeaderProps {
  title: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonText?: string;
}

export function Header({ title, showAddButton = false, onAddClick, addButtonText = "Add New" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-border/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow pulse-ring hover-magnetic">
                <Building2 className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-rainbow animate-gradient-shift">
                  {title}
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Premium Construction Solutions</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {showAddButton && (
              <Button
                onClick={onAddClick}
                size="icon-mobile"
                className="bg-gradient-primary hover:shadow-glow text-primary-foreground border-0 hover:scale-105 transition-all duration-300 rounded-2xl group relative overflow-hidden neon-glow px-4 py-2"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Plus className="h-5 w-5 sm:mr-2 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                <span className="relative z-10 hidden sm:inline font-semibold">{addButtonText}</span>
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}