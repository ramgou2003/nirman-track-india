import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Payment } from "@/types";

const paymentSchema = z.object({
  type: z.enum(['received', 'given']),
  to: z.string().min(1, "Recipient/Payer name is required"),
  amount: z.string().min(1, "Amount is required").refine((val) => !isNaN(Number(val)), "Amount must be a number"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(['pending', 'completed']),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  projectId: string;
  onSubmit: (data: Omit<Payment, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function PaymentForm({ projectId, onSubmit, onCancel }: PaymentFormProps) {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      type: 'received',
      to: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
    },
  });

  const handleSubmit = (data: PaymentFormData) => {
    const submitData: Omit<Payment, 'id' | 'createdAt'> = {
      projectId,
      type: data.type,
      to: data.to,
      amount: Number(data.amount),
      description: data.description,
      date: data.date,
      status: data.status,
    };
    onSubmit(submitData);
  };

  return (
    <div className="glass p-6 rounded-2xl border border-border/20 shadow-glow backdrop-blur-xl animate-scale-in">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Add Payment Record
        </h3>
        <p className="text-muted-foreground mt-2">Record a payment received or given for this project</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="glass border-border/50">
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="glass backdrop-blur-xl">
                    <SelectItem value="received">Payment Received</SelectItem>
                    <SelectItem value="given">Payment Given</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {form.watch('type') === 'received' ? 'Received From' : 'Paid To'}
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter name" className="glass border-border/50" />
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
                  <Textarea {...field} placeholder="Enter payment description" className="glass border-border/50" rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="glass border-border/50">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="glass backdrop-blur-xl">
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-primary hover:shadow-glow text-primary-foreground border-0 hover:scale-105 transition-all duration-300 rounded-xl"
            >
              Add Payment
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1 glass border-border/50 hover:bg-secondary/20 transition-all duration-300 rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}