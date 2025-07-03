import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Expense } from "@/types";

const expenseSchema = z.object({
  category: z.enum(['materials', 'labor', 'equipment', 'transport', 'other']),
  description: z.string().min(1, "Description is required"),
  amount: z.string().min(1, "Amount is required").refine((val) => !isNaN(Number(val)), "Amount must be a number"),
  date: z.string().min(1, "Date is required"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  projectId: string;
  onSubmit: (data: Omit<Expense, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function ExpenseForm({ projectId, onSubmit, onCancel }: ExpenseFormProps) {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      category: 'materials',
      description: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
    },
  });

  const handleSubmit = (data: ExpenseFormData) => {
    const submitData: Omit<Expense, 'id' | 'createdAt'> = {
      projectId,
      category: data.category,
      description: data.description,
      amount: Number(data.amount),
      date: data.date,
    };
    onSubmit(submitData);
  };

  return (
    <div className="glass p-6 rounded-2xl border border-border/20 shadow-glow backdrop-blur-xl animate-scale-in">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Add Project Expense
        </h3>
        <p className="text-muted-foreground mt-2">Record a new expense for this project</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="glass border-border/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="glass backdrop-blur-xl">
                    <SelectItem value="materials">Materials</SelectItem>
                    <SelectItem value="labor">Labor</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Textarea {...field} placeholder="Enter expense description" className="glass border-border/50" rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter amount" className="glass border-border/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" className="glass border-border/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              size="mobile"
              className="bg-gradient-primary hover:shadow-glow text-primary-foreground border-0 hover:scale-105 transition-all duration-300 rounded-xl"
            >
              Add Expense
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="mobile"
              onClick={onCancel}
              className="glass border-border/50 hover:bg-secondary/20 transition-all duration-300 rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}