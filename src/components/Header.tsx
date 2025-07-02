import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
  title: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonText?: string;
}

export function Header({ title, showAddButton = false, onAddClick, addButtonText = "Add New" }: HeaderProps) {
  return (
    <header className="bg-gradient-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground animate-fade-in">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {showAddButton && (
              <Button 
                onClick={onAddClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-medium transition-all duration-300 hover:shadow-strong hover:scale-105"
              >
                <Plus className="mr-2 h-4 w-4" />
                {addButtonText}
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}