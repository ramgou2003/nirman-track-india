import { Project, Expense, Payment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Edit, Trash2, TrendingUp, DollarSign, Clock, IndianRupee } from "lucide-react";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
  expenses: Expense[];
  payments: Payment[];
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

export function ProjectCard({ project, expenses, payments, onEdit, onDelete, onView }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  // Calculate net balance
  const projectExpenses = expenses.filter(e => e.projectId === project.id);
  const projectPayments = payments.filter(p => p.projectId === project.id);

  const totalExpenses = projectExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalReceived = projectPayments
    .filter(p => p.type === 'received')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const totalPaid = projectPayments
    .filter(p => p.type === 'given')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const netBalance = totalReceived - totalPaid - totalExpenses;

  return (
    <Card className="group hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 border border-blue-500/30 rounded-2xl bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4 px-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-black line-clamp-1 text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
              {project.name}
            </CardTitle>
          </div>
          <Badge className={`${status.color} rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 shrink-0`}>
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </Badge>
        </div>
        {/* Separator below project name */}
        <div className="mt-4 border-t border-blue-500/30"></div>
      </CardHeader>
      
      <CardContent className="px-5 pb-5 pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
            <User className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium">Client</p>
              <p className="font-semibold text-sm truncate">{project.clientName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 hover:from-blue-100 hover:to-blue-150 transition-colors duration-200">
            <IndianRupee className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-blue-600/80 font-medium">Net Balance</p>
              <p className={`font-bold text-sm ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{netBalance.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Separator above action buttons */}
        <div className="border-t border-blue-500/30 mt-4"></div>
        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(project)}
            className="flex-1 h-9 text-sm font-semibold border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
          >
            View Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(project)}
            className="h-9 w-9 p-0 hover:bg-accent/20 hover:text-accent rounded-lg transition-all duration-200"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(project.id)}
            className="h-9 w-9 p-0 hover:bg-destructive/20 hover:text-destructive rounded-lg transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}