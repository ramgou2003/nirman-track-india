import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Edit, Trash2, TrendingUp, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onView: (project: Project) => void;
}

const statusConfig = {
  planning: { 
    color: 'bg-warning/20 text-warning border-warning/30', 
    icon: Clock,
    label: 'Planning'
  },
  'in-progress': { 
    color: 'bg-primary/20 text-primary border-primary/30', 
    icon: TrendingUp,
    label: 'In Progress'
  },
  'on-hold': { 
    color: 'bg-muted/20 text-muted-foreground border-muted/30', 
    icon: Clock,
    label: 'On Hold'
  },
  completed: { 
    color: 'bg-success/20 text-success border-success/30', 
    icon: TrendingUp,
    label: 'Completed'
  }
};

export function ProjectCard({ project, onEdit, onDelete, onView }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <Card className="group relative overflow-hidden glass hover:shadow-glow hover-lift border-border/50 backdrop-blur-xl">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {project.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>
          <Badge className={`${status.color} backdrop-blur-sm border rounded-lg px-3 py-1 font-medium`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 border border-border/30">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <User className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Client</p>
              <p className="font-semibold text-foreground">{project.clientName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 border border-border/30">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Timeline</p>
              <p className="font-semibold text-sm">
                {format(new Date(project.startDate), 'MMM dd')} - {format(new Date(project.expectedEndDate), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-primary/10 border border-primary/20">
            <div className="w-8 h-8 rounded-lg bg-primary/30 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="font-bold text-primary text-lg">₹{project.totalBudget.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(project)}
            className="flex-1 glass border-primary/30 hover:bg-primary hover:text-primary-foreground hover:shadow-glow transition-all duration-300 rounded-lg"
          >
            View Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(project)}
            className="glass hover:bg-accent/20 hover:text-accent border border-transparent hover:border-accent/30 transition-all duration-300 rounded-lg"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(project.id)}
            className="glass hover:bg-destructive/20 hover:text-destructive border border-transparent hover:border-destructive/30 transition-all duration-300 rounded-lg"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}