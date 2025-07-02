import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Project } from "@/types";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  clientName: z.string().min(1, "Client name is required"),
  startDate: z.string().min(1, "Start date is required"),
  expectedEndDate: z.string().min(1, "Expected end date is required"),
  status: z.enum(['planning', 'in-progress', 'on-hold', 'completed']),
  totalBudget: z.string().min(1, "Budget is required").refine((val) => !isNaN(Number(val)), "Budget must be a number"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
      clientName: project?.clientName || "",
      startDate: project?.startDate || "",
      expectedEndDate: project?.expectedEndDate || "",
      status: project?.status || "planning",
      totalBudget: project?.totalBudget.toString() || "",
    },
  });

  const handleSubmit = (data: ProjectFormData) => {
    const submitData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
      name: data.name,
      description: data.description,
      clientName: data.clientName,
      startDate: data.startDate,
      expectedEndDate: data.expectedEndDate,
      status: data.status,
      totalBudget: Number(data.totalBudget),
    };
    onSubmit(submitData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass p-8 rounded-3xl border border-border/20 shadow-glow backdrop-blur-xl animate-scale-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {project ? 'Edit Project' : 'Create New Project'}
          </h2>
          <p className="text-muted-foreground mt-2">
            {project ? 'Update your project details below' : 'Set up your construction project with comprehensive details'}
          </p>
        </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter project name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter project description" rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter client name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedEndDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected End Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Budget (₹)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter budget amount" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 pt-8">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-primary hover:shadow-glow text-primary-foreground border-0 hover:scale-105 transition-all duration-300 rounded-xl h-12 text-lg font-semibold"
            >
              {project ? 'Update Project' : 'Create Project'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1 glass border-border/50 hover:bg-secondary/20 transition-all duration-300 rounded-xl h-12 text-lg font-semibold"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  </div>
  );
}