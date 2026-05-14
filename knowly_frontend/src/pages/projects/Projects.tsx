import { useState } from "react";
import Header from "../../components/projects/Header";
import FilterBar from "../../components/projects/FilterBar";
import ProjectGrid from "../../components/projects/ProjectGrid";
import ProjectList from "../../components/projects/ProjectList";
import { TaskFormModal } from "../../components/my-task/TaskFormModal";
import { AddProjectForm } from "../../components/projects/AddProjectForm";

const Projects = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);

  const handleAddProject = () => {};

  return (
    <div className="min-h-full bg-[#0F0F0F]">
      <div className="max-w-[1800px] mx-auto px-6 py-4 space-y-6">
        {/* Header */}
        <Header openAddProject={setIsOpenAddForm}/>

        {/* Filters */}
        <FilterBar viewMode={viewMode} setViewMode={setViewMode} />

        {/* Projects Grid/List */}
        {viewMode === "grid" ? <ProjectGrid /> : <ProjectList />}
      </div>

      <AddProjectForm
        isOpen={isOpenAddForm}
        onClose={() => {
          setIsOpenAddForm(false);
        }}
        onSubmit={handleAddProject}
      />
    </div>
  );
};

export default Projects;
