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
import { Search, Building2, TrendingUp, Users, Wallet } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import constructionHero from "@/assets/construction-hero.jpg";

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
        title="Construction Projects"
        showAddButton={!showForm}
        onAddClick={() => setShowForm(true)}
        addButtonText="New Project"
      />
      
      <main className="container mx-auto px-4 py-6">
        {showForm ? (
          <ProjectForm
            project={editingProject}
            onSubmit={editingProject ? handleEditProject : handleAddProject}
            onCancel={handleCancelForm}
          />
        ) : (
          <div className="space-y-6">
            {/* Search and Filter - Only show when there are projects */}
            {projects.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects or clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 bg-card">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
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
              <div className="animate-fade-in">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-hero shadow-strong mb-8">
                  <div className="absolute inset-0">
                    <img 
                      src={constructionHero} 
                      alt="Construction site" 
                      className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
                  </div>
                  <div className="relative px-8 py-16 text-center">
                    <Building2 className="w-16 h-16 mx-auto mb-6 text-primary-foreground animate-bounce-subtle" />
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                      Welcome to Your Construction Hub
                    </h1>
                    <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                      Streamline your construction projects with comprehensive tracking of expenses, payments, labor, and suppliers.
                    </p>
                    <Button 
                      onClick={() => setShowForm(true)}
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 shadow-strong transition-all duration-300 hover:scale-105"
                    >
                      <Building2 className="mr-2 h-5 w-5" />
                      Start Your First Project
                    </Button>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-card p-6 rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105">
                    <Wallet className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Financial Tracking</h3>
                    <p className="text-muted-foreground">Track all expenses, payments received from clients, and payments made to suppliers and workers.</p>
                  </div>
                  
                  <div className="bg-gradient-card p-6 rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105">
                    <Users className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Labor Management</h3>
                    <p className="text-muted-foreground">Manage your workforce with daily rates, skills tracking, and work assignments.</p>
                  </div>
                  
                  <div className="bg-gradient-card p-6 rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105">
                    <TrendingUp className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Project Insights</h3>
                    <p className="text-muted-foreground">Get detailed insights into project progress, budget utilization, and profitability.</p>
                  </div>
                </div>

                {/* Quick Start Guide */}
                <div className="bg-card p-6 rounded-xl border shadow-soft">
                  <h3 className="text-lg font-semibold mb-4">Quick Start Guide</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                      <span>Create your first construction project</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                      <span>Add labor and suppliers to your database</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                      <span>Track expenses and payments as work progresses</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={(project) => {
                      setEditingProject(project);
                      setShowForm(true);
                    }}
                    onDelete={(id) => setDeleteId(id)}
                    onView={handleViewProject}
                  />
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