import { useState } from "react";
import { Project, Expense, Payment } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectForm } from "@/components/ProjectForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { Search, Building2, TrendingUp, Users, Wallet, Zap, BarChart3, Target, Sparkles, Rocket, Shield, Globe, ArrowRight, Play, Filter, SlidersHorizontal, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import heroModern from "@/assets/hero-modern.jpg";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", []);
  const [expenses] = useLocalStorage<Expense[]>("expenses", []);
  const [payments] = useLocalStorage<Payment[]>("payments", []);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleAddProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects([newProject, ...projects]);
    setShowForm(false);
    toast({
      title: "Project Created",
      description: `${newProject.name} has been created successfully.`,
    });
  };

  const handleEditProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProject) return;
    
    const updatedProject: Project = {
      ...projectData,
      id: editingProject.id,
      createdAt: editingProject.createdAt,
      updatedAt: new Date().toISOString(),
    };
    
    setProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p));
    setEditingProject(null);
    setShowForm(false);
    toast({
      title: "Project Updated",
      description: `${updatedProject.name} has been updated successfully.`,
    });
  };

  const handleDeleteProject = () => {
    if (!deleteId) return;
    const project = projects.find(p => p.id === deleteId);
    setProjects(projects.filter(p => p.id !== deleteId));
    setDeleteId(null);
    toast({
      title: "Project Deleted",
      description: `${project?.name} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  const handleViewProject = (project: Project) => {
    navigate(`/project/${project.id}`);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="KHUSHI Homes"
        showAddButton={!showForm}
        onAddClick={() => setShowForm(true)}
        addButtonText="Create Project"
      />
      
      <main className="container mx-auto px-6 py-4">
        {showForm ? (
          <ProjectForm
            project={editingProject}
            onSubmit={editingProject ? handleEditProject : handleAddProject}
            onCancel={handleCancelForm}
          />
        ) : (
          <div className="space-y-4">
            {/* Ultra-Modern Quick Start Guide - Moved to top */}
            {projects.length === 0 && (
              <div className="animate-fade-in">
                <div className="glass-strong p-10 rounded-3xl border border-blue-500/30 hover:shadow-glow transition-all duration-500 particles-bg relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full morph-shape animate-float"></div>
                  <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent/5 rounded-full animate-bounce-subtle"></div>

                  <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary/80 text-sm font-medium mb-6">
                        <Rocket className="w-4 h-4" />
                        <span>Quick Setup Process</span>
                      </div>
                      <h3 className="text-4xl font-bold mb-4 text-gradient-rainbow animate-gradient-shift">
                        Get Started in Minutes
                      </h3>
                      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Launch your construction management journey with our streamlined onboarding process
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div className="text-center group relative">
                        <div className="relative inline-block mb-6">
                          <div className="w-20 h-20 bg-gradient-primary text-primary-foreground rounded-3xl flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300 shadow-glow pulse-ring">
                            1
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                            <Building2 className="w-3 h-3 text-success-foreground" />
                          </div>
                        </div>
                        <h4 className="font-bold text-xl mb-3 text-gradient-primary">Create Project</h4>
                        <p className="text-muted-foreground leading-relaxed">Set up your construction project with AI-assisted timeline and budget optimization</p>
                      </div>

                      <div className="text-center group relative">
                        <div className="relative inline-block mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-3xl flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300 shadow-glow">
                            2
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                            <Users className="w-3 h-3 text-warning-foreground" />
                          </div>
                        </div>
                        <h4 className="font-bold text-xl mb-3 text-gradient-primary">Add Team & Resources</h4>
                        <p className="text-muted-foreground leading-relaxed">Invite team members, configure suppliers, and set up intelligent resource allocation</p>
                      </div>

                      <div className="text-center group relative">
                        <div className="relative inline-block mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-success to-success/80 text-success-foreground rounded-3xl flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300 shadow-glow pulse-ring">
                            3
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <BarChart3 className="w-3 h-3 text-primary-foreground" />
                          </div>
                        </div>
                        <h4 className="font-bold text-xl mb-3 text-gradient-primary">Track Progress</h4>
                        <p className="text-muted-foreground leading-relaxed">Monitor expenses, payments, and milestones with real-time analytics and insights</p>
                      </div>
                    </div>

                    {/* Call to action */}
                    <div className="text-center mt-12">
                      <Button
                        onClick={() => setShowForm(true)}
                        size="lg"
                        className="bg-gradient-primary hover:shadow-glow text-primary-foreground border-0 hover:scale-105 transition-all duration-300 rounded-2xl font-bold group relative overflow-hidden px-8 py-4 neon-glow"
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Sparkles className="mr-3 h-5 w-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="relative z-10 text-lg">Start Building Now</span>
                        <ArrowRight className="ml-3 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Search and Filter Controls */}
            {projects.length > 0 && (
              <div className="flex flex-row gap-4 items-center animate-fade-in">
                {/* Search Section */}
                <div className="flex-1">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Search className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <Input
                      placeholder="Search projects, clients, or descriptions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-14 pr-4 h-14 bg-background/50 border-2 border-border/30 hover:border-primary/50 focus:border-primary rounded-2xl text-base font-medium placeholder:text-muted-foreground/70 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-2xl"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-lg bg-muted/20 hover:bg-destructive/20 flex items-center justify-center transition-colors duration-300 group"
                      >
                        <X className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors duration-300" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Button */}
                <div className="w-auto">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-14 h-14 bg-background/50 border-2 border-border/30 hover:border-accent/50 focus:border-accent rounded-2xl text-base font-medium backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-2xl">
                      <SlidersHorizontal className="h-5 w-5 text-accent" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl">
                      <SelectItem value="all" className="rounded-xl font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                          All Status
                        </div>
                      </SelectItem>
                      <SelectItem value="planning" className="rounded-xl font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-warning"></div>
                          Planning
                        </div>
                      </SelectItem>
                      <SelectItem value="in-progress" className="rounded-xl font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          In Progress
                        </div>
                      </SelectItem>
                      <SelectItem value="on-hold" className="rounded-xl font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                          On Hold
                        </div>
                      </SelectItem>
                      <SelectItem value="completed" className="rounded-xl font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-success"></div>
                          Completed
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Projects Grid */}
            {projects.length === 0 ? (
              <div className="animate-fade-in space-y-8">

                {/* Enhanced Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="group glass-strong hover:shadow-glow hover-magnetic p-8 rounded-3xl border border-blue-500/30 relative overflow-hidden gradient-border">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow pulse-ring">
                        <BarChart3 className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gradient-primary group-hover:animate-pulse">
                        Smart Analytics
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Real-time dashboards with AI-powered insights for budget tracking, timeline optimization, and predictive cost analysis.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group glass-strong hover:shadow-glow hover-magnetic p-8 rounded-3xl border border-blue-500/30 relative overflow-hidden neon-glow">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                        <Users className="w-10 h-10 text-accent-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gradient-primary group-hover:animate-pulse">
                        Team Coordination
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Manage your workforce with skill-based assignments, automated payroll calculations, and performance tracking.
                      </p>
                    </div>
                  </div>

                  <div className="group glass-strong hover:shadow-glow hover-magnetic p-8 rounded-3xl border border-blue-500/30 relative overflow-hidden gradient-border">
                    <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow pulse-ring">
                        <Target className="w-10 h-10 text-success-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gradient-primary group-hover:animate-pulse">
                        Goal Achievement
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Set project milestones, track completion rates, and optimize resource allocation for maximum efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="max-w-md mx-auto glass p-8 rounded-2xl border border-blue-500/30">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">No projects found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria to find your projects.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                    }}
                    variant="outline" 
                    size="mobile"
                    className="glass border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProjects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProjectCard
                      project={project}
                      expenses={expenses}
                      payments={payments}
                      onEdit={(project) => {
                        setEditingProject(project);
                        setShowForm(true);
                      }}
                      onDelete={(id) => setDeleteId(id)}
                      onView={handleViewProject}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
              All associated expenses and payments will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}