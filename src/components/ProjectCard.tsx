import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onView: (project: Project) => void;
}

const statusColors = {
  planning: 'bg-warning text-warning-foreground',
  'in-progress': 'bg-primary text-primary-foreground',
  'on-hold': 'bg-muted text-muted-foreground',
  completed: 'bg-success text-success-foreground'
};

const statusLabels = {
  planning: 'Planning',
  'in-progress': 'In Progress',
  'on-hold': 'On Hold',
  completed: 'Completed'
};

export function ProjectCard({ project, onEdit, onDelete, onView }: ProjectCardProps) {
  return (
    <Card className="bg-gradient-card hover:shadow-medium transition-all duration-300 hover:scale-[1.02] animate-fade-in group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
              {project.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          <Badge className={statusColors[project.status]}>
            {statusLabels[project.status]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="mr-2 h-4 w-4" />
            <span>{project.clientName}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>
              {format(new Date(project.startDate), 'MMM dd, yyyy')} - {format(new Date(project.expectedEndDate), 'MMM dd, yyyy')}
            </span>
          </div>
          
          <div className="text-sm font-semibold text-primary">
            Budget: ₹{project.totalBudget.toLocaleString('en-IN')}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(project)}
            className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(project)}
            className="hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(project.id)}
            className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}