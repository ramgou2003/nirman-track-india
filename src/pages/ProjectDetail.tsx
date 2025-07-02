import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Project, Expense, Payment, Labor, Supplier } from "@/types";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, User, Wallet, Users, Truck } from "lucide-react";
import { format } from "date-fns";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [projects] = useLocalStorage<Project[]>("projects", []);
  const [expenses] = useLocalStorage<Expense[]>("expenses", []);
  const [payments] = useLocalStorage<Payment[]>("payments", []);
  
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

  const statusColors = {
    planning: 'bg-warning text-warning-foreground',
    'in-progress': 'bg-primary text-primary-foreground',
    'on-hold': 'bg-muted text-muted-foreground',
    completed: 'bg-success text-success-foreground'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title={project.name} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-secondary transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          {/* Project Overview */}
          <Card className="bg-gradient-card shadow-medium animate-fade-in">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
            <Card className="bg-gradient-card hover:shadow-medium transition-all duration-300">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Total Expenses</div>
                <div className="text-2xl font-bold text-destructive">₹{totalExpenses.toLocaleString('en-IN')}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card hover:shadow-medium transition-all duration-300">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Received</div>
                <div className="text-2xl font-bold text-success">₹{totalReceived.toLocaleString('en-IN')}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card hover:shadow-medium transition-all duration-300">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Paid Out</div>
                <div className="text-2xl font-bold text-warning">₹{totalPaid.toLocaleString('en-IN')}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card hover:shadow-medium transition-all duration-300">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Net Balance</div>
                <div className={`text-2xl font-bold ${totalReceived - totalPaid - totalExpenses >= 0 ? 'text-success' : 'text-destructive'}`}>
                  ₹{(totalReceived - totalPaid - totalExpenses).toLocaleString('en-IN')}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Tabs */}
          <Tabs defaultValue="expenses" className="animate-fade-in">
            <TabsList className="grid w-full grid-cols-4 bg-card">
              <TabsTrigger value="expenses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Wallet className="mr-2 h-4 w-4" />
                Expenses
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="labor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Users className="mr-2 h-4 w-4" />
                Labor
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Truck className="mr-2 h-4 w-4" />
                Suppliers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="expenses" className="mt-4">
              <Card className="bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Project Expenses</CardTitle>
                    <Button onClick={() => navigate(`/project/${id}/expenses`)}>
                      Manage Expenses
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {projectExpenses.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No expenses recorded yet</p>
                  ) : (
                    <div className="space-y-3">
                      {projectExpenses.slice(0, 5).map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {expense.category} • {format(new Date(expense.date), 'MMM dd, yyyy')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-destructive">₹{expense.amount.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      ))}
                      {projectExpenses.length > 5 && (
                        <p className="text-center text-muted-foreground">
                          And {projectExpenses.length - 5} more...
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="mt-4">
              <Card className="bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Payments</CardTitle>
                    <Button onClick={() => navigate(`/project/${id}/payments`)}>
                      Manage Payments
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {projectPayments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No payments recorded yet</p>
                  ) : (
                    <div className="space-y-3">
                      {projectPayments.slice(0, 5).map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                          <div>
                            <p className="font-medium">{payment.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {payment.type === 'received' ? 'From' : 'To'} {payment.to} • {format(new Date(payment.date), 'MMM dd, yyyy')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${payment.type === 'received' ? 'text-success' : 'text-warning'}`}>
                              {payment.type === 'received' ? '+' : '-'}₹{payment.amount.toLocaleString('en-IN')}
                            </p>
                            <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                              {payment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {projectPayments.length > 5 && (
                        <p className="text-center text-muted-foreground">
                          And {projectPayments.length - 5} more...
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="labor" className="mt-4">
              <Card className="bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Labor Management</CardTitle>
                    <Button onClick={() => navigate('/labor')}>
                      Manage Labor
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Labor management coming soon. Click "Manage Labor" to view all workers.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suppliers" className="mt-4">
              <Card className="bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Suppliers</CardTitle>
                    <Button onClick={() => navigate('/suppliers')}>
                      Manage Suppliers
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
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