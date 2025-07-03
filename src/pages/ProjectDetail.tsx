import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Project, Expense, Payment, Labor, Supplier } from "@/types";
import { Header } from "@/components/Header";
import { ExpenseForm } from "@/components/ExpenseForm";
import { PaymentForm } from "@/components/PaymentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, User, Wallet, Users, Truck, TrendingUp, Plus } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [projects] = useLocalStorage<Project[]>("projects", []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);
  const [payments, setPayments] = useLocalStorage<Payment[]>("payments", []);
  
  // Form visibility states
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Tab state for mobile dropdown
  const [currentTab, setCurrentTab] = useState("summary");
  
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Project Not Found" />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Project not found</h2>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const projectExpenses = expenses.filter(e => e.projectId === id);
  const projectPayments = payments.filter(p => p.projectId === id);
  
  const totalExpenses = projectExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalReceived = projectPayments
    .filter(p => p.type === 'received')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const totalPaid = projectPayments
    .filter(p => p.type === 'given')
    .reduce((sum, payment) => sum + payment.amount, 0);

  // Handlers for adding new records
  const handleAddExpense = (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setExpenses([newExpense, ...expenses]);
    setShowExpenseForm(false);
    toast({
      title: "Expense Added",
      description: `${newExpense.description} has been recorded successfully.`,
    });
  };

  const handleAddPayment = (paymentData: Omit<Payment, 'id' | 'createdAt'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setPayments([newPayment, ...payments]);
    setShowPaymentForm(false);
    toast({
      title: "Payment Added",
      description: `Payment ${newPayment.type} has been recorded successfully.`,
    });
  };

  const statusColors = {
    planning: 'bg-warning text-warning-foreground',
    'in-progress': 'bg-primary text-primary-foreground',
    'on-hold': 'bg-muted text-muted-foreground',
    completed: 'bg-success text-success-foreground'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title={project.name} />
      
      <main className="container mx-auto px-4 py-3">
        <div className="space-y-3">
          {/* Back Button and Mobile Tab Dropdown Row */}
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="h-10 bg-red-50 hover:bg-red-100 border border-red-300 hover:border-red-400 text-red-700 hover:text-red-800 transition-all duration-300 px-3"
            >
              <ArrowLeft className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Button>

            {/* Mobile Tab Dropdown */}
            <div className="block lg:hidden flex-1">
              <Select value={currentTab} onValueChange={setCurrentTab}>
                <SelectTrigger className="w-full h-10 bg-blue-600 hover:bg-blue-700 border border-blue-600 hover:border-blue-700 rounded-xl text-white font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-xl border border-blue-500/50 rounded-xl">
                  <SelectItem value="summary" className="rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Summary
                    </div>
                  </SelectItem>
                  <SelectItem value="expenses" className="rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Expenses
                    </div>
                  </SelectItem>
                  <SelectItem value="payments" className="rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Payments
                    </div>
                  </SelectItem>
                  <SelectItem value="labor" className="rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Labor
                    </div>
                  </SelectItem>
                  <SelectItem value="suppliers" className="rounded-lg">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Suppliers
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Desktop Tabs */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="animate-fade-in">
            <TabsList className="hidden lg:grid w-full grid-cols-5 bg-card mb-6">
              <TabsTrigger value="summary" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-3">
                <TrendingUp className="mr-1 h-3 w-3 lg:mr-2 lg:h-4 lg:w-4" />
                <span className="truncate">Summary</span>
              </TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-3">
                <Wallet className="mr-1 h-3 w-3 lg:mr-2 lg:h-4 lg:w-4" />
                <span className="truncate">Expenses</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-3 lg:col-start-3">
                <Calendar className="mr-1 h-3 w-3 lg:mr-2 lg:h-4 lg:w-4" />
                <span className="truncate">Payments</span>
              </TabsTrigger>
              <TabsTrigger value="labor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-3">
                <Users className="mr-1 h-3 w-3 lg:mr-2 lg:h-4 lg:w-4" />
                <span className="truncate">Labor</span>
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-3">
                <Truck className="mr-1 h-3 w-3 lg:mr-2 lg:h-4 lg:w-4" />
                <span className="truncate">Suppliers</span>
              </TabsTrigger>
            </TabsList>

            {/* Summary Tab Content */}
            <TabsContent value="summary" className="mt-6">
              <div className="space-y-6">
                {/* Project Overview */}
                <Card className="bg-gradient-card shadow-medium animate-fade-in border border-blue-500/30">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl">{project.name}</CardTitle>
                        <p className="text-muted-foreground mt-1">{project.description}</p>
                      </div>
                      <Badge className={statusColors[project.status]}>
                        {project.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="mr-2 h-4 w-4" />
                          <span>Client</span>
                        </div>
                        <p className="font-semibold">{project.clientName}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Duration</span>
                        </div>
                        <p className="font-semibold">
                          {format(new Date(project.startDate), 'MMM dd, yyyy')} - {format(new Date(project.expectedEndDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Wallet className="mr-2 h-4 w-4" />
                          <span>Budget</span>
                        </div>
                        <p className="font-semibold text-primary">₹{project.totalBudget.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 animate-fade-in">
                  <Card className="bg-gradient-card hover:shadow-medium transition-all duration-300 border border-blue-500/30">
                    <CardContent className="p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-muted-foreground">Total Expenses</div>
                      <div className="text-lg sm:text-2xl font-bold text-destructive">₹{totalExpenses.toLocaleString('en-IN')}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card hover:shadow-medium transition-all duration-300 border border-blue-500/30">
                    <CardContent className="p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-muted-foreground">Received</div>
                      <div className="text-lg sm:text-2xl font-bold text-success">₹{totalReceived.toLocaleString('en-IN')}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card hover:shadow-medium transition-all duration-300 border border-blue-500/30">
                    <CardContent className="p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-muted-foreground">Paid Out</div>
                      <div className="text-lg sm:text-2xl font-bold text-warning">₹{totalPaid.toLocaleString('en-IN')}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card hover:shadow-medium transition-all duration-300 border border-blue-500/30">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Net Balance</div>
                      <div className={`text-2xl font-bold ${totalReceived - totalPaid - totalExpenses >= 0 ? 'text-success' : 'text-destructive'}`}>
                        ₹{(totalReceived - totalPaid - totalExpenses).toLocaleString('en-IN')}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="expenses" className="mt-6">
              {showExpenseForm ? (
                <ExpenseForm
                  projectId={id!}
                  onSubmit={handleAddExpense}
                  onCancel={() => setShowExpenseForm(false)}
                />
              ) : (
                <Card className="bg-gradient-card shadow-medium border border-blue-500/30 min-h-[calc(100vh-200px)] flex flex-col">
                  <CardHeader className="pb-3 pt-2 pr-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Wallet className="mr-2 h-5 w-5" />
                        Project Expenses
                      </CardTitle>
                      <Button
                        onClick={() => setShowExpenseForm(true)}
                        size="icon-mobile"
                        className="bg-gradient-primary hover:shadow-glow text-primary-foreground border-0 hover:scale-105 transition-all duration-300 rounded-xl"
                      >
                        <Plus className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Add Expense</span>
                      </Button>
                    </div>
                    {/* Separator below Project Expenses header */}
                    <div className="mt-4 border-t border-blue-500/30"></div>
                  </CardHeader>
                  <CardContent className="flex-1 pb-8">
                    {projectExpenses.length === 0 ? (
                      <div className="text-center py-12">
                        <Wallet className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground mb-4">No expenses recorded yet</p>
                        <Button
                          onClick={() => setShowExpenseForm(true)}
                          variant="outline"
                          size="icon-mobile"
                          className="glass border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                          <Plus className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Add First Expense</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {projectExpenses.map((expense) => (
                          <div key={expense.id} className="flex items-center justify-between p-4 glass rounded-xl border border-blue-500/30 hover:shadow-medium transition-all duration-300">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-foreground">{expense.description}</p>
                                <p className="font-bold text-destructive text-lg">₹{expense.amount.toLocaleString('en-IN')}</p>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <Badge variant="outline" className="capitalize">{expense.category}</Badge>
                                <span>{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              {showPaymentForm ? (
                <PaymentForm
                  projectId={id!}
                  onSubmit={handleAddPayment}
                  onCancel={() => setShowPaymentForm(false)}
                />
              ) : (
                <Card className="bg-gradient-card shadow-medium border border-blue-500/30 min-h-[calc(100vh-200px)] flex flex-col">
                  <CardHeader className="pb-3 pt-2 pr-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        Payments
                      </CardTitle>
                      <Button
                        onClick={() => setShowPaymentForm(true)}
                        size="icon-mobile"
                        className="bg-gradient-primary hover:shadow-glow text-primary-foreground border-0 hover:scale-105 transition-all duration-300 rounded-xl"
                      >
                        <Plus className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Add Payment</span>
                      </Button>
                    </div>
                    {/* Separator below Payments header */}
                    <div className="mt-4 border-t border-blue-500/30"></div>
                  </CardHeader>
                  <CardContent className="flex-1 pb-8">
                    {projectPayments.length === 0 ? (
                      <div className="text-center py-12">
                        <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground mb-4">No payments recorded yet</p>
                        <Button
                          onClick={() => setShowPaymentForm(true)}
                          variant="outline"
                          size="icon-mobile"
                          className="glass border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                          <Plus className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Add First Payment</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {projectPayments.map((payment) => (
                          <div key={payment.id} className="flex items-center justify-between p-4 glass rounded-xl border border-blue-500/30 hover:shadow-medium transition-all duration-300">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-foreground">{payment.description}</p>
                                <p className={`font-bold text-lg ${payment.type === 'received' ? 'text-success' : 'text-warning'}`}>
                                  {payment.type === 'received' ? '+' : '-'}₹{payment.amount.toLocaleString('en-IN')}
                                </p>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>{payment.type === 'received' ? 'From' : 'To'} {payment.to}</span>
                                <span>{format(new Date(payment.date), 'MMM dd, yyyy')}</span>
                                <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                                  {payment.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="labor" className="mt-4">
              <Card className="bg-gradient-card border border-blue-500/30 min-h-[calc(100vh-200px)] flex flex-col">
                <CardHeader className="pb-3 pt-2 pr-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Labor Management</CardTitle>
                    <Button
                      onClick={() => navigate('/labor')}
                      size="icon-mobile"
                    >
                      <Users className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Manage Labor</span>
                    </Button>
                  </div>
                  {/* Separator below Labor Management header */}
                  <div className="mt-4 border-t border-blue-500/30"></div>
                </CardHeader>
                <CardContent className="flex-1 pb-8">
                  <p className="text-center text-muted-foreground py-8">
                    Labor management coming soon. Click "Manage Labor" to view all workers.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suppliers" className="mt-4">
              <Card className="bg-gradient-card border border-blue-500/30 min-h-[calc(100vh-200px)] flex flex-col">
                <CardHeader className="pb-3 pt-2 pr-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Suppliers</CardTitle>
                    <Button
                      onClick={() => navigate('/suppliers')}
                      size="icon-mobile"
                    >
                      <Truck className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Manage Suppliers</span>
                    </Button>
                  </div>
                  {/* Separator below Suppliers header */}
                  <div className="mt-4 border-t border-blue-500/30"></div>
                </CardHeader>
                <CardContent className="flex-1 pb-8">
                  <p className="text-center text-muted-foreground py-8">
                    Supplier management coming soon. Click "Manage Suppliers" to view all suppliers.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}