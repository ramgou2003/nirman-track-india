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
    <div className="bg-card p-6 rounded-lg shadow-medium animate-scale-in">
      <h2 className="text-xl font-semibold mb-4">
        {project ? 'Edit Project' : 'Create New Project'}
      </h2>
      
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

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-medium hover:shadow-strong transition-all duration-300"
            >
              {project ? 'Update Project' : 'Create Project'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1 hover:bg-secondary transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}