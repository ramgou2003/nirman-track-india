import { useState } from "react";
import { Project } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectForm } from "@/components/ProjectForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { Search, Building2, TrendingUp, Users, Wallet, Zap, BarChart3, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import heroModern from "@/assets/hero-modern.jpg";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", []);
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
        title="Construction Hub"
        showAddButton={!showForm}
        onAddClick={() => setShowForm(true)}
        addButtonText="Create Project"
      />
      
      <main className="container mx-auto px-6 py-8">
        {showForm ? (
          <ProjectForm
            project={editingProject}
            onSubmit={editingProject ? handleEditProject : handleAddProject}
            onCancel={handleCancelForm}
          />
        ) : (
          <div className="space-y-8">
            {/* Search and Filter - Only show when there are projects */}
            {projects.length > 0 && (
              <div className="flex flex-col lg:flex-row gap-4 animate-fade-in">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search projects, clients, or descriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 glass border-border/50 rounded-xl text-base"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-64 h-12 glass border-border/50 rounded-xl">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="glass backdrop-blur-xl">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Welcome Hero Section or Projects Grid */}
            {projects.length === 0 ? (
              <div className="animate-fade-in space-y-8">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-3xl glass border border-border/20 shadow-glow">
                  <div className="absolute inset-0">
                    <img 
                      src={heroModern} 
                      alt="Modern construction management" 
                      className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
                  </div>
                  <div className="relative px-8 py-20 lg:py-32 text-center">
                    <div className="max-w-4xl mx-auto space-y-8">
                      <div className="animate-float">
                        <Building2 className="w-20 h-20 mx-auto mb-8 text-primary-foreground drop-shadow-lg" />
                      </div>
                      <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
                          Next-Gen Construction
                          <span className="block bg-gradient-to-r from-primary-foreground to-primary-foreground/70 bg-clip-text text-transparent">
                            Management Platform
                          </span>
                        </h1>
                        <p className="text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                          Transform your construction business with AI-powered project tracking, 
                          real-time financial insights, and seamless team collaboration.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Button 
                          onClick={() => setShowForm(true)}
                          size="lg"
                          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-glow transition-all duration-500 hover:scale-105 rounded-xl font-semibold group relative overflow-hidden w-full sm:w-auto"
                        >
                          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                          <Building2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
                          <span className="relative z-10 text-sm sm:text-lg">Start Your First Project</span>
                        </Button>
                        <Button 
                          variant="outline"
                          size="lg"
                          className="glass border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl font-semibold backdrop-blur-sm w-full sm:w-auto"
                        >
                          <Zap className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                          <span className="text-sm sm:text-lg">Explore Features</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="group glass hover:shadow-glow hover-lift p-8 rounded-2xl border border-border/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <BarChart3 className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                        Smart Analytics
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Real-time dashboards with AI-powered insights for budget tracking, timeline optimization, and predictive cost analysis.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group glass hover:shadow-glow hover-lift p-8 rounded-2xl border border-border/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-8 h-8 text-accent-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                        Team Coordination
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Manage your workforce with skill-based assignments, automated payroll calculations, and performance tracking.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group glass hover:shadow-glow hover-lift p-8 rounded-2xl border border-border/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Target className="w-8 h-8 text-success-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-success transition-colors duration-300">
                        Goal Achievement
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Set project milestones, track completion rates, and optimize resource allocation for maximum efficiency.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Quick Start Guide */}
                <div className="glass p-8 rounded-2xl border border-border/20 hover:shadow-glow transition-all duration-500">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-primary bg-clip-text text-transparent">
                      Get Started in Minutes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center group">
                        <div className="w-16 h-16 bg-gradient-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                          1
                        </div>
                        <h4 className="font-semibold text-lg mb-2">Create Project</h4>
                        <p className="text-muted-foreground">Set up your construction project with timeline and budget details</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-accent">
                          2
                        </div>
                        <h4 className="font-semibold text-lg mb-2">Add Resources</h4>
                        <p className="text-muted-foreground">Register your workforce and supplier network for easy management</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-16 h-16 bg-gradient-to-br from-success to-success/80 text-success-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          3
                        </div>
                        <h4 className="font-semibold text-lg mb-2">Track Progress</h4>
                        <p className="text-muted-foreground">Monitor expenses, payments, and project milestones in real-time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="max-w-md mx-auto glass p-8 rounded-2xl border border-border/20">
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